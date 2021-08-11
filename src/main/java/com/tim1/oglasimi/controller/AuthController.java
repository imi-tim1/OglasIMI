package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.Model;
import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.tim1.oglasimi.security.SecurityConfig.checkAccess;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping
    public ResponseEntity<Model> checkAuth(@RequestBody Model model ) {
        ResultPair resultPair = checkAccess( model.getJwt(), Role.VISITOR, Role.EMPLOYER, Role.APPLICANT, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        if( httpStatus != HttpStatus.OK ) {
            model.setJwt(null);
        }

        return ResponseEntity
                .status(httpStatus)
                .body(model);
    }
}
