package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.Applicant;
import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.payload.JobFeed;
import com.tim1.oglasimi.model.payload.JobFilter;

import java.util.List;

public interface JobRepository extends CRUDRepository<Job, Integer>
{
    List<Applicant> getJobApplicants(Integer jobId);
    JobFeed getFilteredJobs(JobFilter jobFilter);
    boolean applyForAJob( Integer jobId, Integer uid);
}
