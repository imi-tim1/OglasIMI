package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.User;
import com.tim1.oglasimi.repository.implementation.UserRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepositoryImpl userRepositoryImpl;

    @Autowired
    public UserService(UserRepositoryImpl userRepositoryImpl) {
        this.userRepositoryImpl = userRepositoryImpl;
    }

    public User getUser(int uid) {
        return userRepositoryImpl.get(uid);
    }
}
