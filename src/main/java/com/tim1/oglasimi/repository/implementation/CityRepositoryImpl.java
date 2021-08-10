package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.City;
import com.tim1.oglasimi.repository.CityRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CityRepositoryImpl implements CityRepository
{
    private static final String STORED_PROCEDURE = "{call get_all_cities()}";

    @Value("${spring.datasource.url}")
    private String databaseSourceUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Override
    public List<City> getAll()
    {
        List<City> cityList = new ArrayList<>();
        City tempCity;

        try (Connection con = DriverManager.getConnection(databaseSourceUrl, databaseUsername, databasePassword );
             CallableStatement cstmt = con.prepareCall( STORED_PROCEDURE ))
        {
            ResultSet rs = cstmt.executeQuery();

            while(rs.next())
            {
                tempCity = new City();
                tempCity.setId(rs.getInt("id"));
                tempCity.setName(rs.getString("name"));

                cityList.add(tempCity);
            }
        }

        catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return cityList;
    }

    @Override
    public boolean create(City city)
    {
        return false;
    }

    @Override
    public City get(Integer integer)
    {
        return null;
    }

    @Override
    public boolean update(City city, Integer integer)
    {
        return false;
    }

    @Override
    public boolean delete(Integer integer)
    {
        return false;
    }
}
