package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.Employer;
import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.payload.RatingResponse;
import com.tim1.oglasimi.repository.implementation.ApplicantRepositoryImpl;

import java.util.List;

public interface EmployerRepository extends CRUDRepository<Employer, Integer>
{
    boolean approve(Integer id);
    List<Job> getPostedJobs(int id);
    RatingResponse getRating(int employer_id, int applicantId, boolean isApplicant);
    boolean rate(int employer_id, int applicantId, double feedbackValue);
}
