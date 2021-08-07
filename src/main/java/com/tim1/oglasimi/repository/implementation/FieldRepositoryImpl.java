package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.Field;
import com.tim1.oglasimi.repository.FieldRepository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class FieldRepositoryImpl implements FieldRepository
{
    private final String databaseLocationUrl;
    private final String username;
    private final String password;

    public FieldRepositoryImpl()
    {
        this.databaseLocationUrl = "jdbc:mariadb://localhost/oglasimi_db";
        this.username = "oglasimi";
        this.password = "12345";
    }

    @Override
    public List<Field> getAll()
    {
        List<Field> fieldList = new ArrayList<Field>();
        Field tempField;

        String sql = "SELECT * FROM field";

        try (Connection con = DriverManager.getConnection(databaseLocationUrl,username,password);
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery())
        {
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
