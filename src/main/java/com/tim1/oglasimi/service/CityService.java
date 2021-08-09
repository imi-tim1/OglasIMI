package com.tim1.oglasimi.service;

import com.tim1.oglasimi.model.City;
import com.tim1.oglasimi.repository.implementation.CityRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService
{
    private CityRepositoryImpl cityRepositoryImpl;

    @Autowired
    public CityService(CityRepositoryImpl cityRepositoryImpl)
    {
        this.cityRepositoryImpl = cityRepositoryImpl;
    }

    public List<City> getAllCities()
    {
        return cityRepositoryImpl.getAll();
    }

}
