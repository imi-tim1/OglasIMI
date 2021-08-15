package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.payload.LoginCredentials;
import com.tim1.oglasimi.model.payload.LoginResponse;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends CRUDRepository<LoginCredentials, Integer> {
    LoginResponse checkCredentials(LoginCredentials loginCredentials );
}