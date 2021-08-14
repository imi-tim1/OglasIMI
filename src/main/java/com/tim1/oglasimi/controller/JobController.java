package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.*;
import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.ArrayList;
import java.util.List;

import static com.tim1.oglasimi.security.SecurityConfig.*;

@Validated
@RestController
@RequestMapping("/api/jobs")
public class JobController
{
    private final JobService jobService;

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
            return ResponseEntity.status(resultPair.getHttpStatus()).headers(responseHeaders).body(jobService.getFilteredJobs(jobFilter));
        }

        return ResponseEntity.status(resultPair.getHttpStatus()).headers(responseHeaders).body(null);
    }

    @PostMapping
    public ResponseEntity<?> postJob(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
                                  @RequestBody Job job)
    {
        ResultPair resultPair = checkAccess( jwt, Role.EMPLOYER );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if( httpStatus != HttpStatus.OK )
        {
            return ResponseEntity
                    .status(httpStatus)
                    .headers(responseHeaders)
                    .body( "You are not allowed to access this resource" );
        }

        boolean flag = jobService.postJob(job);

        if(flag) return ResponseEntity.status(HttpStatus.CREATED).headers(responseHeaders).body(null);
        return ResponseEntity.status(HttpStatus.CONFLICT).headers(responseHeaders).body(null);
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
                                                 @Max( Integer.MAX_VALUE ) int jobId ) {
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

        int employerId = 0;
        List<Applicant> applicantList = null;

        Job job = jobService.getJob(jobId);

        /* check if job exists */
        if( job == null ) {
            httpStatus = HttpStatus.NOT_FOUND;
            System.out.println("Job doesn't exist");
        }
        else {
            employerId = job.getEmployer().getId();
            System.out.println("employerId: " + employerId + "; uid= " + uid);
            /* check if another employer is trying to access the api;
            only admin and employer himself are allowed to access list of employer's posts */
            if( Role.EMPLOYER.equalsTo(role) && employerId != uid ) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .headers(responseHeaders)
                        .body( null );
            }

            applicantList = jobService.getJobApplicants(jobId);

            if( applicantList == null || applicantList.isEmpty() ) {
                httpStatus = HttpStatus.NOT_FOUND;
                System.out.println("No one appliend for this job");
            }
        }

        return ResponseEntity
                .status(httpStatus)
                .headers(responseHeaders)
                .body( applicantList );
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

        if(httpStatus == HttpStatus.OK)
        {
            return ResponseEntity.status(resultPair.getHttpStatus()).headers(responseHeaders).body(jobService.getJob(id));
        }

        return ResponseEntity.status(resultPair.getHttpStatus()).headers(responseHeaders).body(null);
    }
}
