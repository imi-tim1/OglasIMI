package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.LoginCredentials;
import com.tim1.oglasimi.model.LoginResponse;
import com.tim1.oglasimi.model.Model;
import com.tim1.oglasimi.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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
     * (Forbidden) i objekat tipa {@link Model} u kome se nalazi prosledjeni JWT korisnika</li>
     * <li>korisnik nije autentifikovan
     * <ol>
     * <li>uneti podaci nisu ispravni: vraca se HTTP status kod 401 (Unauthorized) i neinicijalizovan objekat
     * tipa {@link Model}</li>
     * <li>uneti podaci su ispravni, ali korisnik jos uvek nije potvrdjen od strane administratora: vraca se HTTP
     * status kod 403 (Forbidden)  i neinicijalizovan objekat tipa {@link Model} </li>
     * <li>uneti podaci su ispravni i korisnik je potvrdjen od strane administratora: vraca se HTTP status kod 200
     * (OK), dodeljuje mu se JWT koji se nalazi u objetku tipa {@link Model} koji se vraca</li>
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
    public ResponseEntity<Model> login( @Valid @RequestBody LoginCredentials loginCredentials) {

        String jwt = loginCredentials.getJwt();
        Model returnModel = new Model();

        // check if authenticated user send the request
        if(  jwt != null && jwt != "" ) {
            returnModel.setJwt( loginCredentials.getJwt() );

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body( returnModel );
        }

        LoginResponse loginResponse = loginService.checkLoginCredentials( loginCredentials );

        /* determinate which HTTP status should be returned */
        HttpStatus httpStatus = HttpStatus.OK;
        if( loginResponse == null ) {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        else {
            returnModel.setJwt( loginResponse.getJwt() );

            if( ! loginResponse.getAreCredsValid() ) {
                httpStatus = HttpStatus.UNAUTHORIZED;
            }
            else if( ! loginResponse.getIsApproved() ){
                httpStatus = HttpStatus.FORBIDDEN;
            }
        }

        return ResponseEntity
                .status(httpStatus)
                .body( returnModel );
    }

}
