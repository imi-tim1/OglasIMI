package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.Employer;
import com.tim1.oglasimi.repository.EmployerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.List;

@Repository
public class EmployerRepositoryImpl implements EmployerRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmployerRepositoryImpl.class);
    private static final String REGISTER_STORED_PROCEDURE_CALL = "{call register_employer(?,?,?,?,?,?,?,?)}";

    @Value("${spring.datasource.url}")
    private String databaseSourceUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Override
    public List<Employer> getAll() {
        return null;
    }

    @Override
    public boolean create(Employer employer) {
        boolean isSuccessfullyRegistered = false;

        try (
                Connection con = DriverManager.getConnection(
                        databaseSourceUrl, databaseUsername, databasePassword );
                CallableStatement cstmt = con.prepareCall( REGISTER_STORED_PROCEDURE_CALL) ) {

            cstmt.setString("p_email", employer.getEmail() );
            cstmt.setString("p_hashed_password", employer.getHashedPassword() );
            cstmt.setString("p_picture_base64", employer.getPictureBase64() );
            cstmt.setString("p_phone_number", employer.getPhoneNumber() );
            cstmt.setString("p_name", employer.getName() );
            cstmt.setString("p_address", employer.getAddress() );
            cstmt.setString("p_tin", employer.getTin() );

            cstmt.registerOutParameter("p_is_added", Types.BOOLEAN);

            cstmt.execute();
            isSuccessfullyRegistered = cstmt.getBoolean("p_is_added");

        } catch ( SQLException e ) {
            LOGGER.debug("checkCredentials | An error occurred while communicating with a database", e );
            e.printStackTrace();
        }

        return isSuccessfullyRegistered;
    }

    @Override
    public Employer get(Integer integer) {
        return null;
    }

    @Override
    public boolean update(Employer employer, Integer integer) {
        return false;
    }

    @Override
    public boolean delete(Integer integer) {
        return false;
    }
}
