package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.Field;
import com.tim1.oglasimi.model.Tag;
import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.service.FieldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tim1.oglasimi.security.SecurityConfig.JWT_CUSTOM_HTTP_HEADER;
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
    public ResponseEntity<List<Field>> getAllFields(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt)
    {
        ResultPair resultPair = checkAccess( jwt, Role.VISITOR, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if(httpStatus == HttpStatus.OK)
        {
            return ResponseEntity.status(resultPair.getHttpStatus()).headers(responseHeaders).body(fieldService.getAllFields());
        }

        return ResponseEntity.status(resultPair.getHttpStatus()).body(null);
    }

    @GetMapping("{id}/tags")
    public ResponseEntity<List<Tag>> getTagList(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt, @PathVariable int id)
    {
        ResultPair resultPair = checkAccess( jwt, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if(httpStatus == HttpStatus.OK)
        {
            return ResponseEntity.status(resultPair.getHttpStatus()).body(fieldService.getTagList(id));
        }

        return ResponseEntity.status(resultPair.getHttpStatus()).headers(responseHeaders).headers(responseHeaders).body(null);
    }
}