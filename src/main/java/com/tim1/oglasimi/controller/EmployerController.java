package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.Employer;
import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.payload.RatingResponse;
import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.service.EmployerService;
import io.jsonwebtoken.Claims;
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
    public ResponseEntity<List<Employer>> getEmployerList( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                           @RequestParam(value = "notApprovedRequested", required = false)
                                                           boolean notApprovedRequested) {
        ResultPair resultPair = checkAccess( jwt, Role.VISITOR, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        /* extract role from the token */
        String role = Role.VISITOR.toString();
        Claims claims = resultPair.getClaims();
        if( claims != null ) {
            role = (String) claims.get(ROLE_CLAIM_NAME);
        }

        boolean isAdmin = false;

        /* check non-admin user requested list of unapproved users */
        if( ! Role.ADMIN.equalsTo(role) && notApprovedRequested ) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .headers(responseHeaders)
                        .body(null);
        }

        List<Employer> employers = employerService.getAllEmployers(notApprovedRequested);

         return ResponseEntity
                .status(HttpStatus.OK)
                .headers(responseHeaders)
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
        if( resultMessage.equals("Successful")) {
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
        ResultPair resultPair = checkAccess( jwt, Role.EMPLOYER, Role.ADMIN, Role.APPLICANT, Role.VISITOR );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        List<Job> postedJobs = employerService.getPostedJobs(id);

        if( postedJobs == null) {
            httpStatus = HttpStatus.NOT_FOUND;
        }

        return ResponseEntity
                .status(httpStatus)
                .headers(responseHeaders)
                .body( postedJobs );
    }

    @GetMapping("{id}/rating")
    public ResponseEntity<RatingResponse> getRating(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                    @PathVariable("id")
                                                    @Min(1)
                                                    @Max(Integer.MAX_VALUE ) int employerId)
    {
        ResultPair resultPair = checkAccess(jwt, Role.VISITOR, Role.EMPLOYER, Role.APPLICANT, Role.ADMIN);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        int applicantId = 0;
        boolean isApplicant = false;

        if(resultPair.getClaims() != null)
        {
            // Ekstraktovanje uid i role iz tokena
            applicantId = (int) (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);
            String role = (String) resultPair.getClaims().get(ROLE_CLAIM_NAME);

            if(Role.APPLICANT.equalsTo(role)) isApplicant = true;
        }

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(employerService.getRating(employerId,applicantId,isApplicant));
    }

    @PostMapping("{id}/rating")
    public ResponseEntity<?> rate(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                  @PathVariable("id")
                                  @Min(1)
                                  @Max(Integer.MAX_VALUE ) int employerId,
                                  @RequestParam @Min(0) @Max(5) double feedbackValue)
    {
        ResultPair resultPair = checkAccess(jwt,Role.APPLICANT);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        int applicantId = (int) (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);

        boolean isSuccessful = employerService.rate(employerId,applicantId,feedbackValue);

        if(isSuccessful) httpStatus = HttpStatus.NO_CONTENT;
        else httpStatus = HttpStatus.CONFLICT;

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
    }
}
