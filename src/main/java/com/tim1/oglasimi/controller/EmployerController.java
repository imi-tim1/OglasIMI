package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.Employer;
import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;

import static com.tim1.oglasimi.security.SecurityConfig.*;


@Validated
@RestController
@RequestMapping("api/employers")
public class EmployerController {

    private final EmployerService employerService;

    @Autowired
    public EmployerController( EmployerService employerService ) {
        this.employerService = employerService;
    }

    @GetMapping
    public ResponseEntity<List<Employer>> getEmployerList( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt ) {
        HttpStatus httpStatus = checkAccess(
                jwt, Role.VISITOR, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN
        ).getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }


        List<Employer> employers = employerService.getAllEmployers();

         return ResponseEntity
                .status(HttpStatus.OK)
                .body(employers);
    }


    @PostMapping
    public ResponseEntity<?> registerEmployer( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                            @Valid @RequestBody Employer employer ) {

        HttpStatus httpStatus = checkAccess( jwt, Role.VISITOR ).getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        /* perform employer registration */
        String resultMessage = employerService.registerEmployer( employer );

        /* check if registration was successful or not */
        if( resultMessage == "Successful" ) {
            httpStatus = HttpStatus.CREATED;
        }
        else {
            httpStatus = HttpStatus.CONFLICT;
        }

        return ResponseEntity
                .status(httpStatus)
                .headers(responseHeaders)
                .body(null);
    }


    @GetMapping("{id}")
    public ResponseEntity<Employer> getEmployer( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                 @PathVariable("id")
                                                 @Min( 1 )
                                                 @Max( Integer.MAX_VALUE ) int id ) {
        HttpStatus httpStatus = checkAccess(
                jwt, Role.VISITOR, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN
        ).getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        Employer employer = employerService.getEmployer(id);

        if( employer == null ) {
            httpStatus = HttpStatus.NOT_FOUND;
        }

        return ResponseEntity
                .status(httpStatus)
                .headers(responseHeaders)
                .body( employer );
    }

    @PutMapping("{id}")
    public ResponseEntity<?> approveEmployer( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                 @PathVariable("id")
                                                 @Min( 1 )
                                                 @Max( Integer.MAX_VALUE ) int id ) {

        HttpStatus httpStatus = checkAccess( jwt, Role.ADMIN ).getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        boolean isSuccessful = employerService.approveEmployer(id);

        if( isSuccessful ) {
            httpStatus = HttpStatus.NO_CONTENT;
        }
        else {
            httpStatus = HttpStatus.CONFLICT;
        }

        return ResponseEntity
                .status(httpStatus)
                .headers(responseHeaders)
                .body( null );
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteEmployer( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                     @PathVariable("id")
                                                     @Min( 1 )
                                                     @Max( Integer.MAX_VALUE ) int id ) {

        HttpStatus httpStatus = checkAccess( jwt, Role.ADMIN ).getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        boolean isSuccessful = employerService.deleteEmployer(id);

        if( isSuccessful ) {
            httpStatus = HttpStatus.NO_CONTENT;
        }
        else {
            httpStatus = HttpStatus.CONFLICT;
        }

        return ResponseEntity
                .status(httpStatus)
                .headers(responseHeaders)
                .body( null );
    }

    @GetMapping("{id}/jobs")
    public ResponseEntity<List<Job>> getPostedJobs(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                   @PathVariable("id")
                                                   @Min( 1 )
                                                   @Max( Integer.MAX_VALUE ) int id ) {
        ResultPair resultPair = checkAccess( jwt, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        double tempUid = (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);
        int uid = (int) tempUid;
        String role = (String) resultPair.getClaims().get(ROLE_CLAIM_NAME);

        /* check if another employer is trying to access the api;
        only admin and employer himself are allowed to access list of employer's posts */
        if( Role.EMPLOYER.equalsTo(role) && id != uid ) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .headers(responseHeaders)
                    .body( null );
        }

        List<Job> postedJobs = employerService.getPostedJobs(id);

        return ResponseEntity
                .status(httpStatus)
                .headers(responseHeaders)
                .body( postedJobs );
    }
}
