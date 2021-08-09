package com.tim1.oglasimi.controller;

import com.tim1.oglasimi.model.City;
import com.tim1.oglasimi.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
    public List<City> getAllCities()
    {
        return cityService.getAllCities();
    }
}
