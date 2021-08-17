package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.Applicant;
import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.service.ApplicantService;
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
@RequestMapping("api/applicants")
public class ApplicantController {

    private final ApplicantService applicantService;

    @Autowired
    public ApplicantController(ApplicantService applicantService) {
        this.applicantService = applicantService;
    }

    @PostMapping
    public ResponseEntity<?> registerApplicant( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                @Valid @RequestBody Applicant applicant ) {

        HttpStatus httpStatus = checkAccess( jwt, Role.VISITOR ).getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        /* perform applicant registration */
        String resultMessage = applicantService.registerApplicant( applicant );

        /* check if registration was successful or not */
        if( resultMessage.equals("Successful") ) {
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
    public ResponseEntity<Applicant> getApplicant(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                  @PathVariable("id")
                                                  @Min( 1 )
                                                  @Max( Integer.MAX_VALUE ) int id)
    {
        ResultPair resultPair = checkAccess(jwt, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        // Ekstraktovanje uid i role iz tokena
        int uid  = (int) (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);
        String role = (String) resultPair.getClaims().get(ROLE_CLAIM_NAME);

        if(Role.APPLICANT.equalsTo(role) && uid != id)
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).headers(responseHeaders).body(null);
        }

        else if(Role.EMPLOYER.equalsTo(role) && !applicantService.isApplied(uid,id))
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).headers(responseHeaders).body(null);
        }

        Applicant applicant = applicantService.getApplicant(id);

        if(applicant != null) return ResponseEntity.status(httpStatus).headers(responseHeaders).body(applicant);

        return ResponseEntity.status(HttpStatus.NOT_FOUND).headers(responseHeaders).body(null);
    }

    @GetMapping
    public ResponseEntity<List<Applicant>> getAllApplicants(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                            @RequestParam boolean notApprovedRequested)
    {
        ResultPair resultPair = checkAccess(jwt,Role.ADMIN);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if(httpStatus == HttpStatus.OK)
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(applicantService.getAllApplicants(notApprovedRequested));
        }

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> approve(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                     @PathVariable("id")
                                     @Min( 1 )
                                     @Max( Integer.MAX_VALUE ) int id )
    {
        ResultPair resultPair = checkAccess(jwt,Role.ADMIN);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        boolean isSuccessful = applicantService.approve(id);

        if(isSuccessful) httpStatus = HttpStatus.NO_CONTENT;
        else httpStatus = HttpStatus.CONFLICT;

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteApplicant(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                             @PathVariable("id")
                                             @Min( 1 )
                                             @Max( Integer.MAX_VALUE ) int id)
    {
        ResultPair resultPair = checkAccess(jwt,Role.ADMIN);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        boolean isSuccessful = applicantService.deleteApplicant(id);

        if(isSuccessful) httpStatus = HttpStatus.NO_CONTENT;
        else httpStatus = HttpStatus.CONFLICT;

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
    }

    @GetMapping("{id}/jobs")
    public ResponseEntity<List<Job>> getListOfJobs(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                   @PathVariable("id")
                                                   @Min( 1 )
                                                   @Max( Integer.MAX_VALUE ) int id)
    {
        ResultPair resultPair = checkAccess(jwt, Role.APPLICANT, Role.ADMIN);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        // Ekstraktovanje uid i role iz tokena
        int uid  = (int) (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);
        String role = (String) resultPair.getClaims().get(ROLE_CLAIM_NAME);

        if(Role.APPLICANT.equalsTo(role) && uid != id)
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).headers(responseHeaders).body(null);
        }

        List<Job> jobs = applicantService.getAppliedJobs(id);

        if(jobs != null) return ResponseEntity.status(httpStatus).headers(responseHeaders).body(jobs);

        return ResponseEntity.status(HttpStatus.NOT_FOUND).headers(responseHeaders).body(null);
    }
}