package com.tim1.oglasimi.model;

import java.util.List;

public class JobFeed
{
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
