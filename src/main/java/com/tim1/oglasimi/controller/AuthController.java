package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.tim1.oglasimi.security.SecurityConfig.JWT_CUSTOM_HTTP_HEADER;
import static com.tim1.oglasimi.security.SecurityConfig.checkAccess;

@RestController
@RequestMapping("/api/auth")
public class AuthController
{
    @GetMapping
    public ResponseEntity<?> checkAuth( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt ) {


        ResultPair resultPair = checkAccess( jwt, Role.VISITOR, Role.EMPLOYER, Role.APPLICANT, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        return ResponseEntity
                .status(httpStatus)
                .headers( responseHeaders )
                .body(null);
    }
}
