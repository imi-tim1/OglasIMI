package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.LoginCredentials;
import com.tim1.oglasimi.model.LoginResponse;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.security.SecurityConfig;
import com.tim1.oglasimi.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.tim1.oglasimi.security.SecurityConfig.JWT_CUSTOM_HTTP_HEADER;
import static com.tim1.oglasimi.security.SecurityConfig.checkAccess;

@RestController
@RequestMapping("/api/login")
@Validated
public class LoginController {

    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) { this.loginService = loginService; }

    /**
     * Prihvata token, email i lozinku, proverava da li su dati podaci ispravi i da li korisnik sme da pristupi
     * ovom endpoint-u.
     * <p>
     * Postoji nekoliko mogucih dogadjaja prilikom poziva ovog metoda:
     * <ol>
     * <li>korisnik je vec autentifikovan i pokusava da pristupi endpoint-u: zahtev se odbija uz HTTP status kod 403
     * (Forbidden) i vracanje primljenog JWT-a preko HTTP header-a {@value SecurityConfig#JWT_CUSTOM_HTTP_HEADER}</li>
     * <li>korisnik nije autentifikovan
     * <ol>
     * <li>uneti podaci nisu ispravni: vraca se HTTP status kod 401 (Unauthorized) i vrednost JWT-a se u HTTP header-u
     * {@value SecurityConfig#JWT_CUSTOM_HTTP_HEADER} postavlja na null</li>
     * <li>uneti podaci su ispravni, ali korisnik jos uvek nije potvrdjen od strane administratora: vraca se HTTP
     * status kod 403 (Forbidden) i vrednost JWT-a se u HTTP header-u {@value SecurityConfig#JWT_CUSTOM_HTTP_HEADER}
     * postavlja na null </li>
     * <li>uneti podaci su ispravni i korisnik je potvrdjen od strane administratora: vraca se HTTP status kod 200
     * (OK), dodeljuje mu se JWT i smesta u HTTP header {@value SecurityConfig#JWT_CUSTOM_HTTP_HEADER}</li>
     * </ol></li>
     * </ol>
     *
     * @param loginCredentials objekat u kome se prihvataju jwt, email i lozinka koji su poslati od strane klijenta
     * @return vraca se {@link org.springframework.http.ResponseEntity} sa objekatom tipa Model u kome se
     * moze naci JWT i odgovarajuci HTTP status
     * @see LoginCredentials
     * @see LoginResponse
     * @see ResponseEntity
     */
    @PostMapping
    public ResponseEntity<?> login(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                       @Valid @RequestBody LoginCredentials loginCredentials) {

        HttpStatus httpStatus = checkAccess( jwt, Role.VISITOR ).getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if(  httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        LoginResponse loginResponse = loginService.checkLoginCredentials( loginCredentials );

        /* determinate which HTTP status should be returned */
        if( loginResponse == null ) {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        else {
            jwt = loginResponse.getJwt();

            if( ! loginResponse.getAreCredsValid() ) {
                httpStatus = HttpStatus.UNAUTHORIZED;
            }
            else if( ! loginResponse.getIsApproved() ){
                httpStatus = HttpStatus.FORBIDDEN;
            }
        }

        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        return ResponseEntity
                .status(httpStatus)
                .headers(responseHeaders)
                .body( null );
    }

}
