package com.tim1.oglasimi.security;

import org.springframework.http.HttpStatus;

import com.google.gson.JsonSyntaxException;
import com.google.gson.stream.MalformedJsonException;
import io.jsonwebtoken.*;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.List;

import static com.tim1.oglasimi.OglasimiApplication.LOGGER;

public class SecurityConfig {

    private static final String ISSUER = "http://localhost:8080";
    private static final String SECRET_KEY = "oeRaYY7Wo24sDqKSX3IM9ASGmdGPmkTd9jo1QTy4b7P9Ze5_9hKolVX8";
    private static final long TIME_TO_LIVE_MILLS = 25000L; // 25s // TODO

    private static final String ROLE_CLAIM_NAME = "rol";

    private static final String DATABASE_LOCATION_URL = "jdbc:mariadb://localhost/oglasimi_db";
    private static final String DATABASE_USERNAME = "oglasimi";
    private static final String DATABASE_PASSWORD = "12345";



    public static ResultPair checkAccess(String token, List<Role> authorizedRoles) {
        ResultPair resultPair = new ResultPair(null, HttpStatus.OK );

        try {
            Claims claims = decodeJWT(token);
            LOGGER.debug("SecurityConfig.checkAccess | Claims: " + claims );

            Object roleClaim = claims.get(ROLE_CLAIM_NAME);

            if( roleClaim == null ) {
                throw new MalformedJsonException("missing role claim");
            }
            Role role = Role.valueOf( (String) roleClaim );

            LOGGER.debug("SecurityConfig.checkAccess | Role: " + role );

            if (role != null) {
                LOGGER.debug("SecurityConfig.checkAccess | Found role inside JWT token: " + role);
                resultPair.setHttpStatus( role.checkAuthorization(authorizedRoles) );
            }
            else {
                LOGGER.error("SecurityConfig.checkAccess | Role from JWT token is equal to null");
                throw new Exception("Unknown role");
            }

            // TODO authentification

            resultPair.setClaims( claims );
        }
        catch ( ExpiredJwtException | SignatureException e ) {
            resultPair.setHttpStatus( HttpStatus.UNAUTHORIZED );
        }
        catch ( MalformedJsonException
                        | JsonSyntaxException
                        | IllegalArgumentException
                        | UnsupportedJwtException e ) {
            LOGGER.error("SecurityConfig.checkAccess | " + e.getMessage() );
            resultPair.setHttpStatus( HttpStatus.BAD_REQUEST );
        }
        catch ( Exception e ) {
            LOGGER.error("SecurityConfig.checkAccess | Something went wrong: " + e.getMessage() );
            e.printStackTrace();
            resultPair.setHttpStatus( HttpStatus.INTERNAL_SERVER_ERROR );
        }

        return resultPair;
    }

    public static String createJWT(int uid, String role) {
        return createJWT(uid, ISSUER, TIME_TO_LIVE_MILLS, role );
    }

    public static String createJWT(int uid, String issuer, long timeToLiveMills, String role) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();

        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        JwtBuilder builder = Jwts.builder()
                .claim("uid", uid)
                .claim("rol", role)
                .setExpiration(new Date(nowMillis + timeToLiveMills))
                .setIssuer(issuer)
                .signWith(signatureAlgorithm, signingKey);

        return builder.compact();
    }

    public static Claims decodeJWT(String jwt) throws MalformedJsonException, RuntimeException {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .parseClaimsJws(jwt).getBody();
    }

}