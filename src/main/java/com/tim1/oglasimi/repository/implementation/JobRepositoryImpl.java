package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.*;
import com.tim1.oglasimi.repository.JobRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JobRepositoryImpl implements JobRepository
{
    private static final String MASTER_STORED_PROCEDURE = "{call get_job_common_filter(?,?,?,?,?)}";
    private static final String TAG_STORED_PROCEDURE = "{call get_job_tag_filter(?,?,?,?,?)}";

    @Value("${spring.datasource.url}")
    private String databaseSourceUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Override
    public List<Job> getFilteredJobs(JobFilter jobFilter)
    {
        List<Job> jobList = new ArrayList<>();
        List<Tag> tempTagList = jobFilter.getTags();
        Job tempJob;

        try (Connection con = DriverManager.getConnection(databaseSourceUrl,databaseUsername,databasePassword);
             CallableStatement cstmtMaster = con.prepareCall(MASTER_STORED_PROCEDURE);
             CallableStatement cstmtTag = con.prepareCall(TAG_STORED_PROCEDURE))
        {
            ResultSet rsTag;

            setStatement(cstmtMaster,jobFilter);
            ResultSet rsMaster = cstmtMaster.executeQuery(); // Glavna tabela sa uobicajenim filterima

            int flagPage = jobFilter.getJobsPerPage();
            int pointerPosition = (jobFilter.getPageNumber() - 1) * jobFilter.getJobsPerPage();

            if(jobFilter.isAscendingOrder()) // Filtriranje za rastuce sortiranje
            {
                rsMaster.afterLast();

                while(pointerPosition != 0) // Pomeranje pointera na zeljeni red
                {
                    rsMaster.previous();
                    pointerPosition--;
                }

                if(tempTagList == null)
                {
                    while(rsMaster.previous())
                    {
                        tempJob = setJobModel(rsMaster);
                        jobList.add(tempJob);

                        flagPage--;
                        if(flagPage == 0) break;
                    }
                }

                else
                {
                    setStatement(cstmtTag,jobFilter);
                    rsTag = cstmtTag.executeQuery();

                    while(rsMaster.previous())
                    {
                        int tempId = rsMaster.getInt("id");

                        boolean flagTag = checkForTag(rsTag, jobFilter.getTags(), tempId);

                        if(flagTag)
                        {
                            tempJob = setJobModel(rsMaster);
                            jobList.add(tempJob);
                        }

                        flagPage--;
                        if(flagPage == 0) break;
                    }
                }
            }

            else // Filtriranje za opadajuce sortiranje
            {
                while(pointerPosition != 0) // Pomeranje pointera na zeljeni red
                {
                    rsMaster.next();
                    pointerPosition--;
                }

                if(tempTagList == null)
                {
                    while(rsMaster.next())
                    {
                        tempJob = setJobModel(rsMaster);
                        jobList.add(tempJob);

                        flagPage--;
                        if(flagPage == 0) break;
                    }
                }

                else
                {
                    setStatement(cstmtTag,jobFilter);
                    rsTag = cstmtTag.executeQuery();

                    while(rsMaster.next())
                    {
                        int tempId = rsMaster.getInt("id");

                        boolean flagTag = checkForTag(rsTag, jobFilter.getTags(), tempId);

                        if(flagTag)
                        {
                            tempJob = setJobModel(rsMaster);
                            jobList.add(tempJob);
                        }

                        flagPage--;
                        if(flagPage == 0) break;
                    }
                }
            }
        }

        catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return jobList;
    }

    public Job setJobModel(ResultSet rs) throws SQLException
    {
        Job tempJob = new Job();

        Employer employer = new Employer();
        employer.setId(rs.getInt("employer_id"));
        employer.setName(rs.getString("e_name"));
        employer.setTin(rs.getString("tin"));
        employer.setAddress(rs.getString("address"));
        employer.setPictureBase64(rs.getString("picture_base64"));
        employer.setPhoneNumber(rs.getString("phone_number"));

        Field field = new Field();
        field.setId(rs.getInt("field_id"));
        field.setName(rs.getString("f_name"));

        City city = new City();
        city.setId(rs.getInt("city_id"));
        city.setName(rs.getString("c_name"));

        tempJob.setId(rs.getInt("id"));
        tempJob.setPostDate(rs.getDate("post_date"));
        tempJob.setTitle(rs.getString("title"));
        tempJob.setDescription(rs.getString("description"));
        tempJob.setSalary(rs.getString("salary"));
        tempJob.setEmployer(employer);
        tempJob.setField(field);
        tempJob.setCity(city);

        return tempJob;
    }

    public void setStatement(CallableStatement cstmt, Job job) throws SQLException
    {
        cstmt.setInt("p_employer_id", job.getEmployer().getId());
        cstmt.setInt("p_field_id", job.getField().getId());
        cstmt.setInt("p_city_id", job.getCity().getId());
        cstmt.setString("p_title", job.getTitle());
        cstmt.setBoolean("p_work_from_home", job.isWorkFromHome());
    }

    public boolean checkForTag(ResultSet rsTag, List<Tag> tagList, int id) throws SQLException
    {
        boolean flag = false;
        int counter = 0;

        rsTag.beforeFirst();

        while(rsTag.next())
        {
            int tmpId = rsTag.getInt("job_id");

            if(id == tmpId)
            {
                int tmpTag = rsTag.getInt("tag_id");

                for(Tag tag : tagList)
                {
                    if(tmpTag == tag.getId()) counter++;
                }
            }
        }

        if(counter == tagList.size()) flag = true;

        return flag;
    }

    @Override
    public List<Job> getAll()
    {
        return null;
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
