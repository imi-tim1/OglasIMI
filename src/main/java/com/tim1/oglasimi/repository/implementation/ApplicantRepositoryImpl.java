package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.Applicant;
import com.tim1.oglasimi.repository.ApplicantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ApplicantRepositoryImpl implements ApplicantRepository
{
    private static final Logger LOGGER = LoggerFactory.getLogger(EmployerRepositoryImpl.class);

    private static final String REGISTER_APPLICANT_PROCEDURE_CALL = "{call register_applicant(?,?,?,?,?,?,?,?)}";
    private static final String CHECK_IF_APPROVED_STORED_PROCEDURE = "{call check_if_approved(?)}";
    private static final String GET_APPLICANT_STORED_PROCEDURE = "{call get_applicant(?)}";
    private static final String APPLICATION_STORED_PROCEDURE = "{call check_application(?,?)}";
    private static final String GET_ALL_APPLICANTS_STORED_PROCEDURE = "{call get_all_applicants(?)}";
    private static final String APPROVE_STORED_PROCEDURE = "{call approve_user(?,?)}";
    private static final String DELETE_STORED_PROCEDURE = "{call delete_user(?,?)}";

    @Value("${spring.datasource.url}")
    private String databaseSourceUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Override
    public List<Applicant> getAll() {
        return null;
    }

    @Override
    public List<Applicant> getAll(boolean approved)
    {
        List<Applicant> applicants = null;

        try (Connection con = DriverManager.getConnection(databaseSourceUrl, databaseUsername, databasePassword);
             CallableStatement cstmt = con.prepareCall(GET_ALL_APPLICANTS_STORED_PROCEDURE))
        {
            cstmt.setBoolean("p_approved",approved);

            ResultSet rs = cstmt.executeQuery();

            if(rs != null)
            {
                applicants = new ArrayList<>();

                while(rs.next())
                {
                    Applicant applicant = setApplicantModel(rs);
                    applicants.add(applicant);
                }
            }
        }

        catch (SQLException throwables) {
            LOGGER.error("getAll | An error occurred while communicating with a database.");
            throwables.printStackTrace();
        }

        return applicants;
    }

    @Override
    public boolean approve(int id)
    {
        boolean isApprovedSuccessfully = false;

        try ( Connection con = DriverManager.getConnection(databaseSourceUrl,databaseUsername,databasePassword );
              CallableStatement cstmt = con.prepareCall(APPROVE_STORED_PROCEDURE))
        {

            cstmt.setInt("p_id", id);
            cstmt.registerOutParameter("p_approved_successfully", Types.BOOLEAN);

            cstmt.executeUpdate();

            isApprovedSuccessfully = cstmt.getBoolean("p_approved_successfully");

        }

        catch ( SQLException e ) {
            LOGGER.error("approve | An error occurred while communicating with a database", e );
            e.printStackTrace();
        }

        return isApprovedSuccessfully;
    }

    @Override
    public boolean create(Applicant applicant) {
        boolean isSuccessfullyRegistered = false;

        try (Connection con = DriverManager.getConnection( databaseSourceUrl, databaseUsername, databasePassword );
             CallableStatement cstmt = con.prepareCall(REGISTER_APPLICANT_PROCEDURE_CALL) ) {

            cstmt.setString("p_email", applicant.getEmail() );
            cstmt.setString("p_hashed_password", applicant.getHashedPassword() );
            cstmt.setString("p_first_name", applicant.getFirstName() );
            cstmt.setString("p_last_name", applicant.getLastName() );
            cstmt.setString("p_picture_base64", applicant.getPictureBase64() );
            cstmt.setString("p_phone_number", applicant.getPhoneNumber() );

            cstmt.registerOutParameter("p_is_added", Types.BOOLEAN);
            cstmt.registerOutParameter("p_already_exists", Types.BOOLEAN);
            cstmt.execute();

            isSuccessfullyRegistered = cstmt.getBoolean("p_is_added");
            boolean alreadyExists = cstmt.getBoolean("p_already_exists");
            if( ! isSuccessfullyRegistered && ! alreadyExists )
                throw new Exception("transaction failed");

        }
        catch ( Exception e ) {
            LOGGER.error("create | An error occurred while communicating with a database.");
            LOGGER.error("create | {}", e.getMessage() );
            e.printStackTrace();
        }

        return isSuccessfullyRegistered;
    }

    @Override
    public Applicant get(Integer id)
    {
        Applicant applicant = null;

        try (Connection con = DriverManager.getConnection(databaseSourceUrl, databaseUsername, databasePassword);
             CallableStatement cstmtApproved = con.prepareCall(CHECK_IF_APPROVED_STORED_PROCEDURE);
             CallableStatement cstmtApplicant = con.prepareCall(GET_APPLICANT_STORED_PROCEDURE))
        {
            ResultSet rs;
            boolean flag;

            cstmtApproved.setInt("p_id",id);

            rs = cstmtApproved.executeQuery();
            rs.first();

            flag = rs.getBoolean("approved");

            if(flag) // Korisnik se prikazuje samo ako je odobren
            {
                cstmtApplicant.setInt("p_id",id);

                rs = cstmtApplicant.executeQuery();

                rs.first();
                applicant = setApplicantModel(rs);
            }
        }

        catch (SQLException throwables) {
            LOGGER.error("get | An error occurred while communicating with a database.");
            throwables.printStackTrace();
        }

        return applicant;
    }

    public Applicant setApplicantModel(ResultSet rs) throws SQLException
    {
        Applicant applicant = new Applicant();

        applicant.setId(rs.getInt("user_id"));
        applicant.setEmail(rs.getString("email"));
        applicant.setFirstName(rs.getString("first_name"));
        applicant.setLastName(rs.getString("last_name"));
        applicant.setPictureBase64("picture_base64");
        applicant.setPhoneNumber("phone_number");

        return applicant;
    }

    // Da li je aplikant prijavljen na neki od poslodavcevih poslova
    public boolean isApplied(int employerId, int applicantId)
    {
        boolean flag = false;

        try (Connection con = DriverManager.getConnection(databaseSourceUrl, databaseUsername, databasePassword);
             CallableStatement cstmt = con.prepareCall(APPLICATION_STORED_PROCEDURE))
        {
            cstmt.setInt("p_employer_id",employerId);
            cstmt.setInt("p_applicant_id",applicantId);

            ResultSet rs = cstmt.executeQuery();

            rs.first();
            if(rs.getInt("count") != 0) flag = true;
        }

        catch (SQLException throwables) {
            throwables.printStackTrace();
        }

        return flag;
    }

    @Override
    public boolean update(Applicant applicant, Integer integer) {
        return false;
    }

    @Override
    public boolean delete(Integer id)
    {
        boolean isDeletedSuccessfully = false;

        try ( Connection con = DriverManager.getConnection( databaseSourceUrl, databaseUsername, databasePassword );
              CallableStatement cstmt = con.prepareCall(DELETE_STORED_PROCEDURE))
        {

            cstmt.setInt("p_id", id);
            cstmt.registerOutParameter("p_deleted_successfully", Types.BOOLEAN);

            cstmt.executeUpdate();

            isDeletedSuccessfully = cstmt.getBoolean("p_deleted_successfully");

        }

        catch ( SQLException e ) {
            LOGGER.error("delete | An error occurred while communicating with a database", e );
            e.printStackTrace();
        }

        return isDeletedSuccessfully;
    }
}
