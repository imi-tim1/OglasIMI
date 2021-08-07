package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.Field;
import com.tim1.oglasimi.service.FieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/fields")
public class FieldController
{
    private final FieldService fieldService;

    @Autowired
    public FieldController(FieldService fieldService)
    {
        this.fieldService = fieldService;
    }

    @GetMapping
    public List<Field> getAllFields()
    {
        return fieldService.getAllFields();
    }
}
