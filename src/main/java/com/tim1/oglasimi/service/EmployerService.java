package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.Employer;
import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.payload.RatingResponse;
import com.tim1.oglasimi.repository.implementation.EmployerRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployerService
{
    private final EmployerRepositoryImpl employerRepositoryImpl;

    @Autowired
    public EmployerService(EmployerRepositoryImpl employerRepositoryImpl) {
        this.employerRepositoryImpl = employerRepositoryImpl;
    }

    public String registerEmployer( Employer employer ) {
        boolean isSuccessful = employerRepositoryImpl.create( employer );

        if( isSuccessful ) {
            return "Successful";
        }

        return "This email address is already in use!";
    }

    public List<Employer> getAllEmployers(boolean notApprovedRequested) {
        return employerRepositoryImpl.getAll(notApprovedRequested);
    }

    public Employer getEmployer(int id) {
        return employerRepositoryImpl.get(id);
    }

    public boolean approveEmployer(int id) {
        return employerRepositoryImpl.approve(id);
    }

    public boolean deleteEmployer(int id) {
        return employerRepositoryImpl.delete(id);
    }

    public List<Job> getPostedJobs(int id) {
        return employerRepositoryImpl.getPostedJobs(id);
    }

    public RatingResponse getRating(int employerId, int applicantId, boolean isApplicant) {
        return employerRepositoryImpl.getRating(employerId,applicantId,isApplicant);
    }

    public boolean rate(int employerId, int applicantId, byte feedbackValue) {
        return employerRepositoryImpl.rate(employerId,applicantId,feedbackValue);
    }
}

