package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.Field;
import com.tim1.oglasimi.model.Tag;
import com.tim1.oglasimi.repository.implementation.FieldRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

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

    public List<Tag> getTagList(int id)
    {
        return fieldRepoImpl.getTagList(id);
    }
}
