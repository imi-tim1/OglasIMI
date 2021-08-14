package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.Applicant;
import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.payload.JobFeed;
import com.tim1.oglasimi.model.payload.JobFilter;
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

    public Job getJob(int id)
    {
        return jobRepositoryImpl.get(id);
    }

    public String applyForAJob(int jobId, int uid) {
        boolean isSuccessful = jobRepositoryImpl.applyForAJob(uid, jobId);

        if( isSuccessful)
            return "Successful";

        return "Unsuccessful";
    }
}
