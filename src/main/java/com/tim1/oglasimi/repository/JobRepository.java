package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.JobFilter;

import java.util.List;

public interface JobRepository extends CRUDRepository<Job, Integer>
{
    List<Job> getFilteredJobs(JobFilter jobFilter);
}
