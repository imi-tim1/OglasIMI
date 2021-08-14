package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.Applicant;
import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.JobFeed;
import com.tim1.oglasimi.model.JobFilter;

import java.util.List;

public interface JobRepository extends CRUDRepository<Job, Integer>
{
    List<Applicant> getJobApplicants(Integer jobId );
    JobFeed getFilteredJobs(JobFilter jobFilter);
}
