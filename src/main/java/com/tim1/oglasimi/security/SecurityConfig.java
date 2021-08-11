package com.tim1.oglasimi.security;

import com.google.gson.JsonSyntaxException;
import com.google.gson.stream.MalformedJsonException;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;


public class SecurityConfig {
    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityConfig.class);

    /**
     * Adresa sajta koji je kreirao token
     */
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
     *     <li>ukoliko je sve ispravno vracaju se claim-ovi sadrzani unutar tokena kao i HTTP status kod 200 (OK)</li>
     *     <li>ukoliko je korisnik autentifikovan, ali njegov tip naloga nema dozvolu za pristup resursu vraca
     *     se HTTP status kod 403 (Forbidden)</li>
     *     <li>ukoliko korisnik:
     *     <ul>
     *         <li>nije autentifikovan</li>
     *         <li>nema dozvolu da pristupi resursu</li>
     *         <li>ima token koji je istekao</li>
     *         <li>izmeni sadrzaj tokena</li>
     *     </ul> vraca se HTTP status kod 401 (Unauthorized)</li>
     *     <li>ukoliko je zahtev neispravan vraca se HTTP status code 400 (Bad Request)</li>
     *     <li>ukoliko se dogodi neka nepredvidjena greska ili izuzetak vraca se HTTP status kod 500 (Internal
     *     Server Error)</li>
     * </ol>
     *
     * @param token JSON Web Token (JWT) za koji se proverava pristupa resursu
     * @param authorizedRoles lista svih tipova naloga kojima je dozvoljen pristup datom resursu
     * @return vraca se {@link org.springframework.http.ResponseEntity} sa objekatom tipa Model u kome se
     * nalazi JWT i odgovarajuci HTTP status
     * @see Claims
     * @see Role
     * @see ResponseEntity
     */
     public static ResultPair checkAccess(String jwt, Role... authorizedRoles) {
        ResultPair resultPair = new ResultPair(null, HttpStatus.OK );

        Role role;

        try {
            /* check if user is authenticated or not */
            if( jwt == null || jwt == "" ) {
                role = Role.VISITOR;
                LOGGER.debug("checkAccess | JWT not found. User role set to visitor " );
            }
            else {
                Claims claims = decodeJWT(jwt);
                LOGGER.debug("checkAccess | extracted JWT claims: " + claims);

                Object roleClaim = claims.get(ROLE_CLAIM_NAME);
                LOGGER.debug("checkAccess | extracted role claim: " + roleClaim);

                /* check if token contains claim for a role */
                if (roleClaim == null) {
                    throw new UnsupportedJwtException("missing role claim");
                }

                /* extract role from the token */
                try {
                    String roleString = (String) roleClaim;
                    role = Role.valueOf( roleString.toUpperCase() );
                    LOGGER.debug("checkAccess | found role inside JWT token: " + role);
                }
                catch ( IllegalArgumentException | NullPointerException e ) {
                    LOGGER.error("checkAccess | an error occurred while extracting role from the token" );
                    throw e;
                }

                resultPair.setClaims( claims );
            }

            resultPair.setHttpStatus( role.checkAuthorization(authorizedRoles) );
        }
        catch ( ExpiredJwtException | SignatureException e ) {
            LOGGER.warn("checkAccess | received JWT is invalid", e );
            resultPair.setHttpStatus( HttpStatus.UNAUTHORIZED );
        }
        catch ( MalformedJsonException
                        | JsonSyntaxException
                        | IllegalArgumentException
                        | UnsupportedJwtException e ) {
            LOGGER.warn("checkAccess | an error occurred while parsing JWT", e );
            resultPair.setHttpStatus( HttpStatus.BAD_REQUEST );
        }
        catch ( Exception e ) {
            LOGGER.error("checkAccess | something went wrong", e );
            e.printStackTrace();
            resultPair.setHttpStatus( HttpStatus.INTERNAL_SERVER_ERROR );
        }

        return resultPair;
    }

    /**
     * Prihvata id korisnika i njegov role i od njih pravi JWT uz pomoc overload-ovanog metoda
     * <p>
     * Issuer i maksimalno trajanje JWT-a se postavljaju na podrazumevane vrednosti koje su definisane kao konstante
     *
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
     *
     * @param uid korisnicki id
     * @param issuer adresa sajta (URL) koji je kreirao token
     * @param timeToLiveMills maksimalno vreme trajanja tokena u milisekundama
     * @param role tip korisnickog naloga
     * @return JSON Web Token (JWT) sa dodaim claim-ovima za id i tip korisnickog naloga
     */
    public static String createJWT(int uid, String issuer, long timeToLiveMills, String role) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        JwtBuilder builder = Jwts.builder()
                .claim("uid", uid)
                .claim("rol", role)
                .setExpiration(
                        new Date( System.currentTimeMillis() + timeToLiveMills )
                )
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
     * @throws SignatureException baca se ukoliko se header i payload ne poklapaju sa signaturom JSON Web Token-a
     * @throws JsonSyntaxException baca se kada se utvrdi da JSON Web Token nije ispravan
     * @throws IllegalArgumentException baca se kada se prosledi neodgovarajuci argument
     * @throws UnsupportedJwtException baca se kada se primi JSON Web Token koji nije ocekivan od strane aplikacije
     *
     * @see Claims
     */
    public static Claims decodeJWT(String jwt)
            throws MalformedJsonException, ExpiredJwtException, SignatureException, JsonSyntaxException {
        return Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .build()
                .parseClaimsJws(jwt).getBody();
    }

}