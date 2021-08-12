package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.Employer;

public interface EmployerRepository extends CRUDRepository<Employer, Integer> {
    boolean approve( Integer id );
}
