package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.Employer;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.tim1.oglasimi.security.SecurityConfig.JWT_CUSTOM_HTTP_HEADER;
import static com.tim1.oglasimi.security.SecurityConfig.checkAccess;


@RestController
@RequestMapping("api/employers")
@Validated
public class EmployerController {

    private final EmployerService employerService;

    @Autowired
    public EmployerController( EmployerService employerService ) {
        this.employerService = employerService;
    }

    @GetMapping
    public ResponseEntity<List<Employer>> getEmployerList( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt ) {
        HttpStatus httpStatus = checkAccess( jwt, Role.VISITOR ).getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( new ArrayList<Employer>() );
        }

        
        List<Employer> employers = employerService.getAllEmployers();

         return ResponseEntity
                .status(HttpStatus.OK)
                .body(employers);
    }


    @PostMapping
    public ResponseEntity<String> register( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                            @Valid @RequestBody Employer employer ) {

        HttpStatus httpStatus = checkAccess( jwt, Role.VISITOR ).getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( "You are not allowed to access this resource" );
        }

        /* perform employer registration */
        String resultMessage = employerService.registerEmployer( employer );

        /* null-safe check if registration was successful or not */
        if( Objects.equals(resultMessage, "Successful") ) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .headers(responseHeaders)
                    .body(resultMessage);
        }

        return ResponseEntity
                .status(HttpStatus.UNPROCESSABLE_ENTITY)
                .headers(responseHeaders)
                .body(resultMessage);
    }
}
