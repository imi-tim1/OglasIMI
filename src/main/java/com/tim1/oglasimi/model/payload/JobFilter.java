package com.tim1.oglasimi.model.payload;

import com.tim1.oglasimi.model.Job;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class JobFilter extends Job
{
    @Min(0)
    @Max(Integer.MAX_VALUE)
    private int pageNumber;

    @Min(5)
    @Max(Integer.MAX_VALUE)
    private int jobsPerPage;

    private boolean ascendingOrder;

    public JobFilter() {
        this.jobsPerPage = 5;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public int getJobsPerPage() {
        return jobsPerPage;
    }

    public void setJobsPerPage(int jobsPerPage) {
        this.jobsPerPage = jobsPerPage;
    }

    public boolean isAscendingOrder() {
        return ascendingOrder;
    }

    public void setAscendingOrder(boolean ascendingOrder) {
        this.ascendingOrder = ascendingOrder;
    }
}
