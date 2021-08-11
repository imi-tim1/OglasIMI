package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.City;
import com.tim1.oglasimi.security.ResultPair;
import com.tim1.oglasimi.security.Role;
import com.tim1.oglasimi.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.tim1.oglasimi.security.SecurityConfig.JWT_CUSTOM_HTTP_HEADER;
import static com.tim1.oglasimi.security.SecurityConfig.checkAccess;

@RestController
@RequestMapping("/api/cities")
public class CityController
{
    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService)
    {
        this.cityService = cityService;
    }

    @GetMapping
    public ResponseEntity<List<City>> getAllCities(@RequestHeader(JWT_CUSTOM_HTTP_HEADER) String jwt)
    {
        ResultPair resultPair = checkAccess( jwt, Role.VISITOR, Role.APPLICANT, Role.EMPLOYER, Role.ADMIN );
        HttpStatus httpStatus = resultPair.getHttpStatus();

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(JWT_CUSTOM_HTTP_HEADER, jwt);

        if(httpStatus == HttpStatus.OK)
        {
            return ResponseEntity.status(resultPair.getHttpStatus()).headers(responseHeaders).body(cityService.getAllCities());
        }

        return ResponseEntity.status(resultPair.getHttpStatus()).headers(responseHeaders).body(null);
    }
}
