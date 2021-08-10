package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.Job;
import com.tim1.oglasimi.model.Tag;
import com.tim1.oglasimi.repository.JobRepository;
import org.springframework.beans.factory.annotation.Value;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class JobRepositoryImpl implements JobRepository
{
    private static final String STORED_PROCEDURE = "{call getJobsPage(?,?,?,?,?,?,?)}";

    @Value("${spring.datasource.url}")
    private String databaseSourceUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Override
    public List<Job> getAll()
    {
        List<Job> jobList = new ArrayList<>();
        Tag tempJob;

        try (Connection con = DriverManager.getConnection("jdbc:mariadb://localhost:3306/oglasimi_db", "oglasimi", "12345" );
             CallableStatement cstmt = con.prepareCall(STORED_PROCEDURE))
        {
            cstmt.setInt("p_employer_id", 0);
            cstmt.setInt("p_field_id", 2);
            cstmt.setInt("p_city_id", 1);
            cstmt.setString("p_title", null);
            cstmt.setString("p_tag", null);
            cstmt.setBoolean("p_work_from_home", false);
            cstmt.setBoolean("p_ascending_order", false);

            ResultSet rs = cstmt.executeQuery();

            while(rs.next())
            {
                int x;
                x = rs.getInt("id");

                System.out.println(x);
            }
        }

        catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return jobList;
    }

    @Override
    public boolean create(Job job)
    {
        return false;
    }

    @Override
    public Job get(Integer integer)
    {
        return null;
    }

    @Override
    public boolean update(Job job, Integer integer)
    {
        return false;
    }

    @Override
    public boolean delete(Integer integer)
    {
        return false;
    }
}
