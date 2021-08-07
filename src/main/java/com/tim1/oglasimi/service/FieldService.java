package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.Field;
import com.tim1.oglasimi.repository.implementation.FieldRepositoryImpl;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldService
{
    FieldRepositoryImpl fieldRepoImpl = new FieldRepositoryImpl();

    public List<Field> getAllFields()
    {
        return fieldRepoImpl.getAll();
    }
}
