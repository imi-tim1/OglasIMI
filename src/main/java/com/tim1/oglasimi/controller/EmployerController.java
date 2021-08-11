package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.Employer;
import com.tim1.oglasimi.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Objects;


@RestController
@RequestMapping("api/employers")
@Validated
public class EmployerController {

    private final EmployerService employerService;

    @Autowired
    public EmployerController( EmployerService employerService ) {
        this.employerService = employerService;
    }

    @PostMapping
    public ResponseEntity<String> register( @Valid @RequestBody Employer employer ) {

        String jwt = employer.getJwt();

        // check if user is already authenticated
        if(  jwt != null && jwt != "" ) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body( "You are not allowed to access this resource" );
        }

        String resultMessage = employerService.registerEmployer( employer );

        /* null-safe check if registration was successful or not */
        if( Objects.equals(resultMessage, "Successful") ) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(resultMessage);
        }

        return ResponseEntity
                .status(HttpStatus.UNPROCESSABLE_ENTITY)
                .body(resultMessage);
    }
}
