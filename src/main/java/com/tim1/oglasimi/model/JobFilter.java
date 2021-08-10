package com.tim1.oglasimi.model;

public class JobFilter extends Job
{
    private int pageNumber;
    private boolean onlyMyJobs;

    public int getPageNumber()
    {
        return pageNumber;
    }

    public void setPageNumber(int pageNumber)
    {
        this.pageNumber = pageNumber;
    }

    public boolean isOnlyMyJobs()
    {
        return onlyMyJobs;
    }

    public void setOnlyMyJobs(boolean onlyMyJobs)
    {
        this.onlyMyJobs = onlyMyJobs;
    }
}
