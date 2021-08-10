package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.Field;
import com.tim1.oglasimi.repository.FieldRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class FieldRepositoryImpl implements FieldRepository
{
    private static final String STORED_PROCEDURE = "{call getAllFields()}";

    @Value("${spring.datasource.url}")
    private String databaseSourceUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Override
    public List<Field> getAll()
    {
        List<Field> fieldList = new ArrayList<>();
        Field tempField;

        try (Connection con = DriverManager.getConnection(databaseSourceUrl, databaseUsername, databasePassword);
             CallableStatement cstmt = con.prepareCall( STORED_PROCEDURE ))
        {
            ResultSet rs = cstmt.executeQuery();

            while(rs.next())
            {
                tempField = new Field();
                tempField.setId(rs.getInt("id"));
                tempField.setName(rs.getString("name"));

                fieldList.add(tempField);
            }
        }

        catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return fieldList;
    }

    @Override
    public boolean create(Field field)
    {
        return false;
    }

    @Override
    public Field get(Integer integer)
    {
        return null;
    }

    @Override
    public boolean update(Field field, Integer integer)
    {
        return false;
    }

    @Override
    public boolean delete(Integer integer)
    {
        return false;
    }
}
