package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.Field;
import com.tim1.oglasimi.repository.implementation.FieldRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldService
{
    private final FieldRepositoryImpl fieldRepoImpl;

    @Autowired
    public FieldService(FieldRepositoryImpl fieldRepoImpl)
    {
        this.fieldRepoImpl = fieldRepoImpl;
    }

    public List<Field> getAllFields()
    {
        return fieldRepoImpl.getAll();
    }
}
