package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.LoginCredentials;
import com.tim1.oglasimi.model.LoginResponse;
import com.tim1.oglasimi.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) { this.loginService = loginService; }



    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginCredentials loginCredentials) {

        String jwt = loginCredentials.getJwt();

        // check if authenticated user send the request
        if(  jwt != null && jwt != "" ) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body( new LoginResponse() );
        }

        LoginResponse loginResponse = loginService.checkLoginCredentials( loginCredentials );

        HttpStatus httpStatus = HttpStatus.OK;
        if( ! loginResponse.getAreCredsValid() ) {
            httpStatus = HttpStatus.UNAUTHORIZED;
        }
        else if( ! loginResponse.getIsApproved() ){
            httpStatus = HttpStatus.FORBIDDEN;
        }

        return ResponseEntity
                .status(httpStatus)
                .body(loginResponse);
    }

}
