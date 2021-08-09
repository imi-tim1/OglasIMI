package com.tim1.oglasimi.controller;

import com.google.gson.stream.MalformedJsonException;
import com.tim1.oglasimi.model.Model;
import com.tim1.oglasimi.security.SecurityConfig;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping
    public ResponseEntity<Model> checkAuth(@RequestBody Model model ) {
        HttpStatus httpStatus;
        try {
            SecurityConfig.decodeJWT( model.getJwt() );
            httpStatus = HttpStatus.OK;
        }
        catch( ExpiredJwtException e ) {
            httpStatus = HttpStatus.UNAUTHORIZED;
            model = new Model();
        }
        catch  (MalformedJsonException e) {
            httpStatus = HttpStatus.BAD_REQUEST;
            model = new Model();
        }

        return ResponseEntity
                .status(httpStatus)
                .body(model);
    }
}
