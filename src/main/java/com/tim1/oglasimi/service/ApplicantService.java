package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.Applicant;
import com.tim1.oglasimi.repository.implementation.ApplicantRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicantService {

    private final ApplicantRepositoryImpl applicantRepositoryImpl;

    @Autowired
    public ApplicantService(ApplicantRepositoryImpl applicantRepositoryImpl) {
        this.applicantRepositoryImpl = applicantRepositoryImpl;
    }

    public String registerApplicant( Applicant applicant ) {
        boolean isSuccessful = applicantRepositoryImpl.create( applicant );

        if( isSuccessful ) {
            return "Successful";
        }

        return "This email address is already in use!";
    }

    public Applicant getApplicant(int id)
    {
        return applicantRepositoryImpl.get(id);
    }

    public boolean isApplied(int employerId, int applicantId)
    {
        return applicantRepositoryImpl.isApplied(employerId,applicantId);
    }

    public List<Applicant> getAllApplicants(boolean approved)
    {
        return applicantRepositoryImpl.getAll(approved);
    }

    public boolean approve(int id)
    {
        return applicantRepositoryImpl.approve(id);
    }
}
