package com.tim1.oglasimi.model;

public class JobFilter extends Job
{
    private int pageNumber;
    private int jobsPerPage;
    private boolean ascendingOrder;

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
