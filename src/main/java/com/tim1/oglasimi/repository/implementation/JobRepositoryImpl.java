package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.*;
import com.tim1.oglasimi.model.payload.JobFeed;
import com.tim1.oglasimi.model.payload.JobFilter;
import com.tim1.oglasimi.repository.JobRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Repository
public class JobRepositoryImpl implements JobRepository
{
    private static final Logger LOGGER = LoggerFactory.getLogger(JobRepositoryImpl.class);

    private static final String MASTER_STORED_PROCEDURE = "{call get_filtered_jobs(?,?,?,?,?)}";
    private static final String TAG_STORED_PROCEDURE = "{call get_tags_for_a_job(?)}";
    private static final String POST_JOB_STORED_PROCEDURE = "{call post_job(?,?,?,?,?,?,?,?)}";
    private static final String INSERT_TAG_STORED_PROCEDURE = "{call insert_tag(?,?,?)}";
    private static final String GET_JOB_APPLICANTS_PROCEDURE_CALL = "{call get_job_applicants(?)}";
    private static final String JOB_APPLY_PROCEDURE_CALL = "{call apply_for_a_job(?,?,?)}";
    private static final String GET_JOB_STORED_PROCEDURE = "{call get_job(?)}";
    private static final String DELETE_JOB_STORED_PROCEDURE = "{call delete_job(?,?)}";


    @Value("${spring.datasource.url}")
    private String databaseSourceUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Override
    public JobFeed getFilteredJobs(JobFilter jobFilter)
    {
        List<Job> jobList = new ArrayList<>();
        List<Tag> tempTagList = jobFilter.getTags();
        JobFeed jobFeed = new JobFeed();
        Job tempJob;

        try (Connection con = DriverManager.getConnection(databaseSourceUrl,databaseUsername,databasePassword);
             CallableStatement cstmtMaster = con.prepareCall(MASTER_STORED_PROCEDURE);
             CallableStatement cstmtTag = con.prepareCall(TAG_STORED_PROCEDURE))
        {
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
                        tempJob = setJobModel(rsMaster,cstmtTag);
                        jobList.add(tempJob);

                        flagPage--;
                        if(flagPage == 0) break;
                    }
                }

                else
                {
                    while(rsMaster.previous())
                    {
                        int tempId = rsMaster.getInt("id");

                        boolean flagTag = checkForTag(cstmtTag, jobFilter.getTags(), tempId);

                        if(flagTag)
                        {
                            tempJob = setJobModel(rsMaster,cstmtTag);
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
                        tempJob = setJobModel(rsMaster,cstmtTag);
                        jobList.add(tempJob);

                        flagPage--;
                        if(flagPage == 0) break;
                    }
                }

                else
                {
                    while(rsMaster.next())
                    {
                        int tempId = rsMaster.getInt("id");

                        boolean flagTag = checkForTag(cstmtTag, jobFilter.getTags(), tempId);

                        if(flagTag)
                        {
                            tempJob = setJobModel(rsMaster,cstmtTag);
                            jobList.add(tempJob);
                        }

                        flagPage--;
                        if(flagPage == 0) break;
                    }
                }
            }

            int count = 0;

            rsMaster.beforeFirst();
            while(rsMaster.next()) count++;

            jobFeed.setJobs(jobList);
            jobFeed.setTotalJobNumber(count);
        }

        catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return jobFeed;
    }

    @Override
    public boolean applyForAJob(Integer jobId, Integer uid) {
        boolean isSuccessful = false;

        try ( Connection con = DriverManager.getConnection( databaseSourceUrl, databaseUsername, databasePassword );
              CallableStatement cstmt = con.prepareCall(JOB_APPLY_PROCEDURE_CALL) ) {

            cstmt.setInt("p_job_id", jobId);
            cstmt.setInt("p_applicant_id", uid);
            cstmt.registerOutParameter("p_successfully_applied", Types.BOOLEAN);

            cstmt.executeUpdate();

            isSuccessful = cstmt.getBoolean("p_successfully_applied");

        } catch ( SQLException e ) {
            LOGGER.error("applyForAJob | An error occurred while communicating with a database", e );
        }

        return isSuccessful;
    }

    @Override
    public List<Applicant> getJobApplicants(Integer jobId) {
        List<Applicant> jobApplicants = null;

        try ( Connection con = DriverManager.getConnection( databaseSourceUrl, databaseUsername, databasePassword );
              CallableStatement cstmt = con.prepareCall(GET_JOB_APPLICANTS_PROCEDURE_CALL)) {

            cstmt.setInt("p_job_id", jobId);
            ResultSet rs = cstmt.executeQuery();

            Applicant tempApplicant;
            jobApplicants = new LinkedList<>();

            while( rs.next() ) {
                tempApplicant = new Applicant();

                tempApplicant.setId( rs.getInt("user_id") );
                tempApplicant.setFirstName( rs.getString("first_name") );
                tempApplicant.setLastName( rs.getString("last_name")  );
                tempApplicant.setPictureBase64( rs.getString("picture_base64") );
                tempApplicant.setPhoneNumber( rs.getString("phone_number") );
                tempApplicant.setEmail( rs.getString("email") );
                tempApplicant.setHashedPassword( rs.getString("hashed_password") );

                jobApplicants.add(tempApplicant);
            }

        }
        catch ( SQLException e ) {
            LOGGER.error("getJobApplicants | An error occurred while communicating with a database" );
            e.printStackTrace();
        }

        return jobApplicants;
    }


    public Job setJobModel(ResultSet rsMaster, CallableStatement cstmtTag) throws SQLException
    {
        Tag tempTag;
        Job tempJob = new Job();
        List<Tag> tags = new ArrayList<>();

        Employer employer = new Employer();
        employer.setId(rsMaster.getInt("employer_id"));
        employer.setName(rsMaster.getString("e_name"));
        employer.setTin(rsMaster.getString("tin"));
        employer.setAddress(rsMaster.getString("address"));
        employer.setPictureBase64(rsMaster.getString("picture_base64"));
        employer.setPhoneNumber(rsMaster.getString("phone_number"));

        Field field = new Field();
        field.setId(rsMaster.getInt("field_id"));
        field.setName(rsMaster.getString("f_name"));

        City city = new City();
        city.setId(rsMaster.getInt("city_id"));
        city.setName(rsMaster.getString("c_name"));

        tempJob.setId(rsMaster.getInt("id"));
        tempJob.setPostDate(rsMaster.getObject("post_date",LocalDateTime.class));
        tempJob.setTitle(rsMaster.getString("title"));
        tempJob.setDescription(rsMaster.getString("description"));
        tempJob.setSalary(rsMaster.getString("salary"));
        tempJob.setEmployer(employer);
        tempJob.setField(field);
        tempJob.setCity(city);
        tempJob.setWorkFromHome(rsMaster.getBoolean("work_from_home"));

        cstmtTag.setInt("p_job_id",tempJob.getId());
        ResultSet rsTag = cstmtTag.executeQuery();

        if(rsTag != null)
        {
            rsTag.beforeFirst();
            while(rsTag.next())
            {
                tempTag = new Tag();
                tempTag.setId(rsTag.getInt("id"));
                tempTag.setFieldId(rsTag.getInt("field_id"));
                tempTag.setName(rsTag.getString("name"));

                tags.add(tempTag);
            }

            tempJob.setTags(tags);
        }

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

    public boolean checkForTag(CallableStatement cstmtTag, List<Tag> tagList, int id) throws SQLException
    {
        boolean flag = false;
        int counter = 0;

        cstmtTag.setInt("p_job_id",id);
        ResultSet rsTag = cstmtTag.executeQuery();

        if(rsTag != null)
        {
            rsTag.beforeFirst();
            while (rsTag.next())
            {
                int tmpTag = rsTag.getInt("id");

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
        boolean isJobSuccessfullyPosted;
        int id = 0;

        try (Connection con = DriverManager.getConnection(databaseSourceUrl,databaseUsername,databasePassword);
             CallableStatement cstmtJob = con.prepareCall(POST_JOB_STORED_PROCEDURE);
             CallableStatement cstmtTag = con.prepareCall(INSERT_TAG_STORED_PROCEDURE))
        {
            setJobPostStatement(cstmtJob,job);
            cstmtJob.registerOutParameter("p_is_posted", Types.BOOLEAN);

            ResultSet rs = cstmtJob.executeQuery();

            isJobSuccessfullyPosted = cstmtJob.getBoolean("p_is_posted");

            if(isJobSuccessfullyPosted && job.getTags() != null) // Ako je job kreiran kako treba i ako postoji lista tagova
            {
                boolean flag;

                rs.first();
                id = rs.getInt("id");

                cstmtTag.setInt("p_job_id",id);
                cstmtTag.registerOutParameter("p_is_inserted", Types.BOOLEAN);

                for(Tag tag : job.getTags())
                {
                    cstmtTag.setInt("p_tag_id",tag.getId());
                    cstmtTag.executeQuery();

                    flag = cstmtTag.getBoolean("p_is_inserted");

                    if(!flag) // Ako nesto nije kako treba poziva se fj-a delete koja brise job i sve sto je vezano za njega
                    {
                        delete(id);
                        isJobSuccessfullyPosted = false;
                        break;
                    }
                }
            }
        }

        catch (SQLException e) {
            delete(id);
            isJobSuccessfullyPosted = false;
            LOGGER.debug("create | An error occurred while communicating with a database", e);
            e.printStackTrace();
        }

        return isJobSuccessfullyPosted;
    }

    public void setJobPostStatement(CallableStatement cstmt, Job job) throws SQLException
    {
        cstmt.setInt("p_employer_id", job.getEmployer().getId());
        cstmt.setInt("p_field_id", job.getField().getId());
        cstmt.setInt("p_city_id", job.getCity().getId());
        cstmt.setString("p_title", job.getTitle());
        cstmt.setString("p_description", job.getDescription());
        cstmt.setString("p_salary", job.getSalary());
        cstmt.setBoolean("p_work_from_home", job.isWorkFromHome());
    }

    @Override
    public Job get(Integer id)
    {
        Job job = null;

        try (Connection con = DriverManager.getConnection(databaseSourceUrl,databaseUsername,databasePassword);
             CallableStatement cstmt = con.prepareCall(GET_JOB_STORED_PROCEDURE);
             CallableStatement cstmtTag = con.prepareCall(TAG_STORED_PROCEDURE))
        {
            cstmt.setInt("p_id", id);

            ResultSet rs = cstmt.executeQuery();

            if(rs.first())
            {
                job = new Job();
                job = setJobModel(rs, cstmtTag);
                job.getEmployer().setEmail(rs.getString("email"));
            }
        }

        catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return job;
    }

    @Override
    public boolean update(Job job, Integer integer)
    {
        return false;
    }

    @Override
    public boolean delete(Integer id)
    {
        boolean isJobSuccessfullyDeleted = false;

        try (Connection con = DriverManager.getConnection(databaseSourceUrl,databaseUsername,databasePassword);
             CallableStatement cstmt = con.prepareCall(DELETE_JOB_STORED_PROCEDURE))
        {
            cstmt.setInt("p_id",id);
            cstmt.registerOutParameter("p_is_deleted", Types.BOOLEAN);

            cstmt.execute();

            isJobSuccessfullyDeleted = cstmt.getBoolean("p_is_deleted");
        }

        catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return isJobSuccessfullyDeleted;
    }
}
