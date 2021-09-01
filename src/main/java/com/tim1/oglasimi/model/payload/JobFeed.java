package com.tim1.oglasimi.model.payload;

import com.tim1.oglasimi.model.Job;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;

public class JobFeed
{
    @Min(0)
    @Max(Integer.MAX_VALUE)
    private int totalJobNumber;

    private List<Job> jobs;

    public int getTotalJobNumber() {
        return totalJobNumber;
    }

    public void setTotalJobNumber(int totalJobNumber) {
        this.totalJobNumber = totalJobNumber;
    }

    public List<Job> getJobs() {
        return jobs;
    }

    public void setJobs(List<Job> jobs) {
        this.jobs = jobs;
    }
}
