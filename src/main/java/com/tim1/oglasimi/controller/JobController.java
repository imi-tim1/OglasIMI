package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.*;
import com.tim1.oglasimi.model.payload.JobFeed;
import com.tim1.oglasimi.model.payload.JobFilter;
import com.tim1.oglasimi.model.payload.LikeResponse;
import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.service.JobService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.Literal;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import static com.tim1.oglasimi.security.SecurityConfig.*;

@Validated
@RestController
@RequestMapping("/api/jobs")
public class JobController
{
    private final JobService jobService;
    private static final Logger LOGGER = LoggerFactory.getLogger(JobController.class);

    @Autowired
    public JobController(JobService jobService)
    {
        this.jobService = jobService;
    }


    @GetMapping
    public ResponseEntity<JobFeed> getFilteredJobs(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                   @RequestParam(required = false) String title,
                                                   @RequestParam(required = false) List<Integer> tagList,
                                                   @RequestParam @Min(0) @Max(Integer.MAX_VALUE) int employerId,
                                                   @RequestParam @Min(0) @Max(Integer.MAX_VALUE) int fieldId,
                                                   @RequestParam @Min(0) @Max(Integer.MAX_VALUE) int cityId,
                                                   @RequestParam @Min(1) @Max(Integer.MAX_VALUE) int pageNumber,
                                                   @RequestParam @Min(5) @Max(Integer.MAX_VALUE) int jobsPerPage,
                                                   @RequestParam boolean workFromHome,
                                                   @RequestParam boolean ascendingOrder)
    {
        JobFilter jobFilter = setJobModel(employerId,fieldId,cityId,title,tagList,workFromHome,pageNumber,jobsPerPage,ascendingOrder);

        ResultPair resultPair = checkAccess( jwt, Role.VISITOR, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if(httpStatus == HttpStatus.OK)
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(jobService.getFilteredJobs(jobFilter));
        }

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
    }

    @PostMapping
    public ResponseEntity<?> postJob(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                     @Valid @RequestBody Job job)
    {
        ResultPair resultPair = checkAccess(jwt, Role.EMPLOYER);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        extractEmployerId(job,resultPair);

        boolean flag = jobService.postJob(job);

        if(flag) return ResponseEntity.status(HttpStatus.CREATED).headers(responseHeaders).body(null);
        return ResponseEntity.status(HttpStatus.CONFLICT).headers(responseHeaders).body(null);
    }

    private void extractEmployerId(Job job, ResultPair resultPair)
    {
        int uid = (int) (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);

        job.setEmployer(new Employer());
        job.getEmployer().setId(uid);

        validation(job);
    }

    private void validation(Job job)
    {
        if(job.getCity() == null)
        {
            job.setCity(new City());
            job.getCity().setId(0);
        }

        if(job.getSalary().equals(""))
        {
            job.setSalary(null);
        }
    }


    private JobFilter setJobModel(int employerId, int fieldId, int cityId, String title, List<Integer> tagList,
                            boolean workFromHome, int pageNumber, int jobsPerPage, boolean ascendingOrder)
    {
        JobFilter jobFilter = new JobFilter();

        Employer employer = new Employer();
        employer.setId(employerId);

        Field field = new Field();
        field.setId(fieldId);

        City city = new City();
        city.setId(cityId);

        List<Tag> tags;
        if(tagList != null)
        {
            tags = new ArrayList<>();

            for(int tagId : tagList)
            {
                Tag tag = new Tag();
                tag.setId(tagId);

                tags.add(tag);
            }
        }

        else tags = null;

        if(title.equals("")) title = "default";
        else title = Pattern.quote(title);

        jobFilter.setEmployer(employer);
        jobFilter.setField(field);
        jobFilter.setCity(city);
        jobFilter.setTitle(title);
        jobFilter.setTags(tags);
        jobFilter.setWorkFromHome(workFromHome);
        jobFilter.setPageNumber(pageNumber);
        jobFilter.setJobsPerPage(jobsPerPage);
        jobFilter.setAscendingOrder(ascendingOrder);

        return jobFilter;
    }

    @GetMapping("{jobId}/applicants")
    public ResponseEntity<List<Applicant>> getJobApplicants( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                             @PathVariable("jobId")
                                                             @Min( 1 )
                                                             @Max( Integer.MAX_VALUE ) int jobId )
    {
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

        /* extract uid and role from the token */

        int uid  = (int) (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);
        LOGGER.debug("getJobApplicants | found uid in the token: {}", uid );

        String role = (String) resultPair.getClaims().get(ROLE_CLAIM_NAME);
        LOGGER.debug("getJobApplicants | found role in the token: {}", role );

        List<Applicant> applicantList = null;

        Job job = jobService.getJob(jobId);

        /* check if job exists */
        if( job == null ) {
            httpStatus = HttpStatus.NOT_FOUND;
            LOGGER.warn("getJobApplicants | job with id {} does not exist", jobId );
        }
        else {
            int employerId = job.getEmployer().getId();

            /* check if another employer is trying to access the api;
            only admin and employer himself are allowed to access list of employer's posts */
            if( Role.EMPLOYER.equalsTo(role) && employerId != uid ) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .headers(responseHeaders)
                        .body( null );
            }

            applicantList = jobService.getJobApplicants(jobId);

            if( applicantList == null ) {
                httpStatus = HttpStatus.NOT_FOUND;
                LOGGER.info("getJobApplicants | no one applied for this job. Job ID: {} )", jobId );
            }
        }

        return ResponseEntity
                .status(httpStatus)
                .headers(responseHeaders)
                .body( applicantList );
    }

    @PostMapping("{jobId}/applicants")
    public ResponseEntity<?> applyForAJob( @RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                           @PathVariable("jobId")
                                           @Min( 1 )
                                           @Max( Integer.MAX_VALUE ) int jobId )
    {
        ResultPair resultPair = checkAccess( jwt, Role.APPLICANT );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK ) {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }


        /* extract uid and role from the token */

        int uid  = (int) (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);
        LOGGER.debug("applyForAJob | found uid in the token: {}", uid );

        String role = (String) resultPair.getClaims().get(ROLE_CLAIM_NAME);
        LOGGER.debug("applyForAJob | found role in the token: {}", role );


        String resultMessage = jobService.applyForAJob(uid, jobId);

        if( resultMessage.equals("Successful") ) {
            httpStatus = HttpStatus.CREATED;
        }
        else {
            httpStatus = HttpStatus.CONFLICT;
        }

        return ResponseEntity
                .status(httpStatus)
                .headers(responseHeaders)
                .body( null );
    }

    @GetMapping("{id}")
    public ResponseEntity<Job> getJob(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                      @PathVariable("id")
                                      @Min( 1 )
                                      @Max( Integer.MAX_VALUE ) int id)
    {
        ResultPair resultPair = checkAccess( jwt, Role.VISITOR, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if(httpStatus != HttpStatus.OK)
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        Job job = jobService.getJob(id);

        if( job == null ) {
            httpStatus = HttpStatus.NOT_FOUND;
        }

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(job);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteJob(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                       @PathVariable("id")
                                       @Min( 1 )
                                       @Max( Integer.MAX_VALUE ) int id)
    {
        ResultPair resultPair = checkAccess(jwt, Role.EMPLOYER, Role.ADMIN);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( null );
        }

        int uid  = (int) (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);
        String role = (String) resultPair.getClaims().get(ROLE_CLAIM_NAME);

        if( Role.EMPLOYER.equalsTo(role) && id != uid ) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .headers(responseHeaders)
                    .body( null );
        }

        boolean flag = jobService.deleteJob(id);

        if(flag) return ResponseEntity.status(HttpStatus.NO_CONTENT).headers(responseHeaders).body(null);
        return ResponseEntity.status(HttpStatus.CONFLICT).headers(responseHeaders).body(null);
    }

    @GetMapping("{id}/comments")
    public ResponseEntity<List<Comment>> getAllComments(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                        @PathVariable("id")
                                                        @Min(1)
                                                        @Max(Integer.MAX_VALUE) int jobId)
    {
        ResultPair resultPair = checkAccess( jwt, Role.VISITOR, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if(httpStatus != HttpStatus.OK)
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(jobService.getAllComments(jobId));
    }

    @PostMapping("{id}/comments")
    public ResponseEntity<?> postComment(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                         @PathVariable("id")
                                         @Min(1)
                                         @Max(Integer.MAX_VALUE) int jobId,
                                         @Valid @RequestBody Comment comment)
    {
        ResultPair resultPair = checkAccess(jwt, Role.APPLICANT, Role.EMPLOYER);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        int uid  = (int) (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);
        String role = (String) resultPair.getClaims().get(ROLE_CLAIM_NAME);

        boolean isSuccessful = false;

        if(Role.APPLICANT.equalsTo(role) && comment.getParentId() == 0)
        {
            isSuccessful = jobService.postComment(comment,jobId,uid,true);
        }

        else if(Role.EMPLOYER.equalsTo(role) && comment.getParentId() != 0)
        {
            isSuccessful = jobService.postComment(comment,jobId,uid,false);
        }

        if(isSuccessful) httpStatus = HttpStatus.CREATED;
        else httpStatus = HttpStatus.CONFLICT;

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
    }

    @DeleteMapping("{jobId}/comments/{id}")
    public ResponseEntity<?> deleteComment(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                           @PathVariable("id")
                                           @Min(1)
                                           @Max(Integer.MAX_VALUE) int id)
    {
        ResultPair resultPair = checkAccess(jwt,Role.ADMIN);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        boolean isSuccessful = jobService.deleteComment(id);

        if(isSuccessful) return ResponseEntity.status(HttpStatus.NO_CONTENT).headers(responseHeaders).body(null);
        return ResponseEntity.status(HttpStatus.CONFLICT).headers(responseHeaders).body(null);
    }

    @GetMapping("{id}/likes")
    public ResponseEntity<LikeResponse> getJobLikes(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                                    @PathVariable("id")
                                                    @Min(1)
                                                    @Max(Integer.MAX_VALUE) int jobId)
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

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(jobService.getJobLikes(jobId,applicantId,isApplicant));
    }

    @PostMapping("{id}/likes")
    public ResponseEntity<?> likeJob(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                         @PathVariable("id")
                                         @Min(1)
                                         @Max(Integer.MAX_VALUE) int jobId)
    {
        ResultPair resultPair = checkAccess(jwt,Role.APPLICANT);
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
        }

        int applicantId  = (int) (double) resultPair.getClaims().get(USER_ID_CLAIM_NAME);

        boolean isSuccessful = jobService.likeJob(jobId,applicantId);

        if(isSuccessful) httpStatus = HttpStatus.CREATED;
        else httpStatus = HttpStatus.CONFLICT;

        return ResponseEntity.status(httpStatus).headers(responseHeaders).body(null);
    }

    @DeleteMapping("{id}/likes")
    public ResponseEntity<?> recallLike(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                           @PathVariable("id")
                                           @Min(1)
                                           @Max(Integer.MAX_VALUE) int jobId)
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

        boolean isSuccessful = jobService.recallLike(jobId,applicantId);

        if(isSuccessful) return ResponseEntity.status(HttpStatus.NO_CONTENT).headers(responseHeaders).body(null);
        return ResponseEntity.status(HttpStatus.CONFLICT).headers(responseHeaders).body(null);
    }
}
