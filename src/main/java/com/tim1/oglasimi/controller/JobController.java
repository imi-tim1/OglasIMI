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

import static com.tim1.oglasimi.security.SecurityConfig.JWT_CUSTOM_HTTP_HEADER;
import static com.tim1.oglasimi.security.SecurityConfig.checkAccess;

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
    public ResponseEntity<List<Job>> getFilteredJobs(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt,
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
        ResultPair resultPair = checkAccess( jwt, Role.VISITOR, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
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
}
