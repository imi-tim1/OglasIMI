package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.Employer;
import com.tim1.oglasimi.repository.implementation.EmployerRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployerService {

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
}

