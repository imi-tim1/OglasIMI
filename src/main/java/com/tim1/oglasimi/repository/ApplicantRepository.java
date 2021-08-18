package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.Applicant;
import com.tim1.oglasimi.model.Job;

import java.util.List;

public interface ApplicantRepository extends CRUDRepository<Applicant, Integer>
{
    List<Applicant> getAll(boolean approved);
    boolean approve(int id);
    List<Job> getAppliedJobs(int id);
}
