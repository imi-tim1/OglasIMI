package com.tim1.oglasimi.repository;

import com.tim1.oglasimi.model.LoginCredentials;
import com.tim1.oglasimi.model.LoginResponse;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends CRUDRepository<LoginCredentials, Integer> {
    LoginResponse checkCredentials(LoginCredentials loginCredentials );
}