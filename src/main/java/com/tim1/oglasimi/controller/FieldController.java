package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.Field;
import com.tim1.oglasimi.model.Model;
import com.tim1.oglasimi.model.Tag;
import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.service.FieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.tim1.oglasimi.security.SecurityConfig.checkAccess;

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
    public ResponseEntity<List<Field>> getAllFields(@RequestBody Model model)
    {
        ResultPair resultPair = checkAccess( model.getJwt(), Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        if(httpStatus == HttpStatus.OK)
        {
            return ResponseEntity.status(resultPair.getHttpStatus()).body(fieldService.getAllFields());
        }

        return ResponseEntity.status(resultPair.getHttpStatus()).body(null);
    }

    @GetMapping("{id}/tags")
    public ResponseEntity<List<Tag>> getTagList(@PathVariable int id, @RequestBody Model model)
    {
        ResultPair resultPair = checkAccess( model.getJwt(), Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        if(httpStatus == HttpStatus.OK)
        {
            return ResponseEntity.status(resultPair.getHttpStatus()).body(fieldService.getTagList(id));
        }

        return ResponseEntity.status(resultPair.getHttpStatus()).body(null);
    }
}