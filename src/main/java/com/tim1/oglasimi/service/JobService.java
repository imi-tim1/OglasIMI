package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.JobFilter;
import com.tim1.oglasimi.repository.implementation.JobRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService
{
    private final JobRepositoryImpl jobRepositoryImpl;

    @Autowired
    public JobService(JobRepositoryImpl jobRepositoryImpl)
    {
        this.jobRepositoryImpl = jobRepositoryImpl;
    }

    public List<Job> getFilteredJobs(JobFilter jobFilter)
    {
        return jobRepositoryImpl.getFilteredJobs(jobFilter);
    }
}
