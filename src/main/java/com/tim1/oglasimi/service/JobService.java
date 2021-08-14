package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.Applicant;
import com.tim1.oglasimi.model.Employer;
import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.JobFeed;
import com.tim1.oglasimi.model.JobFilter;
import com.tim1.oglasimi.repository.implementation.JobRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService
{
    private JobRepositoryImpl jobRepositoryImpl;

    @Autowired
    public JobService(JobRepositoryImpl jobRepositoryImpl)
    {
        this.jobRepositoryImpl = jobRepositoryImpl;
    }

    public JobFeed getFilteredJobs(JobFilter jobFilter)
    {
        return jobRepositoryImpl.getFilteredJobs(jobFilter);
    }

    public boolean postJob(Job job)
    {
        return jobRepositoryImpl.create(job);
    }

    public List<Applicant> getJobApplicants(int job_id) {
        return jobRepositoryImpl.getJobApplicants(job_id);
    }

    public Job getJob( int id ) { // TODO replace hardcoded code
        switch (id) {
            case 1:
                return new Job( 1,
                        new Employer(4,null,null,null,null,null,null,null),
                        null,null,null,null,null,null,null,false);
            case 2:
                return new Job( 2,
                        new Employer(4,null,null,null,null,null,null,null),
                        null,null,null,null,null,null,null,false);
            case 3:
                return new Job( 3,
                        new Employer(5,null,null,null,null,null,null,null),
                        null,null,null,null,null,null,null,false);
            case 4:
                return new Job( 4,
                        new Employer(5,null,null,null,null,null,null,null),
                        null,null,null,null,null,null,null,false);
            case 5:
                return new Job( 5,
                        new Employer(4,null,null,null,null,null,null,null),
                        null,null,null,null,null,null,null,false);
            case 6:
                return new Job( 6,
                        new Employer(4,null,null,null,null,null,null,null),
                        null,null,null,null,null,null,null,false);
            case 7:
                return new Job( 7,
                        new Employer(5,null,null,null,null,null,null,null),
                        null,null,null,null,null,null,null,false);
        }

        return null;
    }
}
