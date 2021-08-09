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

    public static final String DATABASE_LOCATION_URI = "jdbc:mariadb://localhost/oglasimi_db";
    public static final String DATABASE_USERNAME = "oglasimi";
    public static final String DATABASE_PASSWORD = "12345";

    public static final String ISSUER = "http://localhost:8080";

    /**
     * Vreme trajanja tokena nakon kojeg nece biti validan
     */
    public static final long TIME_TO_LIVE_MILLS = 25000L; // 25s // TODO decide default value; 15min is recommended val

    /**
     * Kljuc za sifrovanje signature JSON Web Token-a (JWT)
     */
    private static final String SECRET_KEY = "oeRaYY7Wo24sDqKSX3IM9ASGmdGPmkTd9jo1QTy4b7P9Ze5_9hKolVX8";

    private static final String ROLE_CLAIM_NAME = "rol";

    /**
     * Proverava da li je token ispravak pozivom funkcije {@link SecurityConfig#decodeJWT(String)} koja ga dekodira
     * ukoliko je ispravan i proverava da li dati korisnik sme da pristupi nekom resursu. Ukoliko token nije ispravan
     * obradjuju se izuzetci i vracaju odgovarajuci HTTP status kodovi.
     * Moguci dogadjaji:
     * <ol>
     *     <li>ukoliko je sve ispravno vracaju ce claim-ovi sadrzani unutar tokena i HTTP status kod 200 (OK)</li>
     *     <li>ukoliko korisnik nema dozvolu da pristupi resursu, ako je token istekao ili ako je izmenjen od strane
     *     korisnika vraca se HTTP status kod 401 (Unauthorized)</li>
     *     <li>ukoliko je zahtev neispravan vraca se HTTP status code 400 (Bad Request)</li>
     *     <li>ukoliko se dogodi neka greska nepredvidjena greska ili izuzetak vraca se HTTP status kod 500 (Internal
     *     Server Error)</li>
     * </ol>
     *
     * @param token JSON Web Token (JWT) za koji se proverava pristupa resursu
     * @param authorizedRoles lista svih tipova naloga kojima je dozvoljen pristup datom resursu
     * @return vraca objekat tipa ResultPair u kome su sadrzani claim-ovi JWT-a i odgovarajuci HTTP status
     * @see Claims
     * @see Role
     */
    public static ResultPair checkAccess(String token, List<Role> authorizedRoles) {
        ResultPair resultPair = new ResultPair(null, HttpStatus.OK );

        try {
            Claims claims = decodeJWT(token);
            LOGGER.debug("SecurityConfig.checkAccess | Claims: " + claims );

            Object roleClaim = claims.get(ROLE_CLAIM_NAME);

            if( roleClaim == null ) {
                throw new MalformedJsonException("missing role claim");
            }

            Role role = null;

            try {
                role = Role.valueOf( (String) roleClaim);
                LOGGER.debug("SecurityConfig.checkAccess | Found role inside JWT token: " + role);
                resultPair.setHttpStatus( role.checkAuthorization(authorizedRoles) );
            }
            catch ( IllegalArgumentException | NullPointerException e ) {
                LOGGER.error("SecurityConfig.checkAccess | exception message: " + e.getMessage() );
                throw new Exception("roleClaim object didn't return expected value");
            }

            resultPair.setClaims( claims );
        }
        catch ( ExpiredJwtException | SecurityException e ) {
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

    /**
     * Prihvata id korisnika i njegov role i od njih pravi JWT uz pomoc overload-ovanog metoda
     * <p>
     * Issuer i maksimalno trajanje JWT-a se postavljaju na podrazumevane vrednosti koje su definisane kao konstante
     * @param uid korisnicki id
     * @param role tip korisnickog naloga
     * @return JSON Web Token (JWT) sa dodaim claim-ovima za id i tip korisnickog naloga
     */
    public static String createJWT(int uid, String role) {
        return createJWT(uid, ISSUER, TIME_TO_LIVE_MILLS, role );
    }
    /**
     * Prihvata id korisnika, njegov role, issuer-a, i maksimalno vreme trajanja tokena i na osnovu tih podataka
     * pravi JWT
     * <p>
     * Koristi HS256 alogritam za sifrovanje signature JWT-a i Base64url za kodiranje header-a i payload-a
     * @param uid korisnicki id
     * @param issuer adresa sajta (URL) koji je kreirao token
     * @param timeToLiveMills maksimalno vreme trajanja tokena u milisekundama
     * @param role tip korisnickog naloga
     * @return JSON Web Token (JWT) sa dodaim claim-ovima za id i tip korisnickog naloga
     */
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
                .signWith(signingKey, signatureAlgorithm);

        return builder.compact();
    }

    /**
     * Prima JSON Web Token u obliku stringa, dekodira ga i vraca njegov sadrzaj ukoliko se uspesno dekodira uz pomoc
     * kljuca, u suprotnom baca odgovarajuce izuzetke
     *
     * @param jwt JSON Web Token primljen od strane klijenta
     * @return sadrzaj tokena u kome se nalaze informacije o korisniku
     * @throws MalformedJsonException baca se kada se utvrdi da JSON nije ispravan
     * @throws ExpiredJwtException baca se ukoliko je primljeni JSON Web Token istekao
     * @throws SecurityException baca se ukoliko se header i payload ne poklapaju sa signaturom JSON Web Token-a
     * @throws JsonSyntaxException baca se kada se utvrdi da JSON Web Token nije ispravan
     * @throws IllegalArgumentException baca se kada se prosledi neodgovarajuci argument
     * @throws UnsupportedJwtException baca se kada se primi JSON Web Token koji nije ocekivan od strane aplikacije
     *
     * @see Claims
     */
    public static Claims decodeJWT(String jwt) throws MalformedJsonException, RuntimeException {
        return Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .build()
                .parseClaimsJws(jwt).getBody();
    }

}