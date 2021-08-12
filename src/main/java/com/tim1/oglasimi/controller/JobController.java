package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.*;
import com.tim1.oglasimi.repository.implementation.JobRepositoryImpl;
import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.tim1.oglasimi.security.SecurityConfig.checkAccess;

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
    public List<Job> getFilteredJobs(@RequestParam(required = false) String title,
                                     @RequestParam(required = false) List<Integer> tagList,
                                     @RequestParam Integer employerId,
                                     @RequestParam Integer fieldId,
                                     @RequestParam Integer cityId,
                                     @RequestParam Integer pageNumber,
                                     @RequestParam Integer jobsPerPage,
                                     @RequestParam Boolean workFromHome,
                                     @RequestParam Boolean ascendingOrder)
    {
        JobFilter jobFilter = setJobModel(employerId,fieldId,cityId,title,tagList,workFromHome,pageNumber,jobsPerPage,ascendingOrder);

        /*ResultPair resultPair = checkAccess( model.getJwt(), Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        if(httpStatus == HttpStatus.OK)
        {
            return ResponseEntity.status(resultPair.getHttpStatus()).body(jobService.getFilteredJobs(jobFilter));
        }

        return ResponseEntity.status(resultPair.getHttpStatus()).body(null);*/

        return jobService.getFilteredJobs(jobFilter);
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

        if(pageNumber == 0) pageNumber = 1;
        if(jobsPerPage == 0) jobsPerPage = 10;

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
