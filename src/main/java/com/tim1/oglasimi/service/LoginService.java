package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.LoginCredentials;
import com.tim1.oglasimi.model.LoginResponse;
import com.tim1.oglasimi.repository.implementation.LoginRepositoryImpl;
import com.tim1.oglasimi.security.SecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class LoginService {
    private final LoginRepositoryImpl loginRepositoryImpl;

    @Autowired
    public LoginService(LoginRepositoryImpl loginRepositoryImpl) {
        this.loginRepositoryImpl = loginRepositoryImpl;
    }

    public LoginResponse checkLoginCredentials(LoginCredentials loginCredentials ) {
        LoginResponse loginResponse = loginRepositoryImpl.checkCredentials( loginCredentials );

        /* if provided credentials are not valid return response without info */
        if( ! loginResponse.getAreCredsValid() ) {
            return new LoginResponse();
        }

        /* if authenticated user is approved return related information without JWT */
        if( ! loginResponse.getIsApproved() ) {
            loginResponse.setApproved( false );

            return loginResponse;
        }

        /* set jwt token for approved authenticated user */
        loginResponse.setJwt(
                SecurityConfig.createJWT(
                    loginResponse.getUserId(),
                    loginResponse.getRole()
                )
        );

        return loginResponse;
    }
}
