package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.Employer;
import com.tim1.oglasimi.model.Job;

import java.util.List;

public interface EmployerRepository extends CRUDRepository<Employer, Integer> {
    boolean approve( Integer id );
    List<Job> getPostedJobs(int id);
}
