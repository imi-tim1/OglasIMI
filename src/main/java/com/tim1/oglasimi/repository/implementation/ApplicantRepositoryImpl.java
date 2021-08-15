package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.Applicant;
import com.tim1.oglasimi.repository.ApplicantRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Types;
import java.util.List;

@Repository
public class ApplicantRepositoryImpl implements ApplicantRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmployerRepositoryImpl.class);

    private static final String REGISTER_APPLICANT_PROCEDURE_CALL = "{call register_applicant(?,?,?,?,?,?,?,?)}";

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
    public Applicant get(Integer integer) {
        return null;
    }

    @Override
    public boolean update(Applicant applicant, Integer integer) {
        return false;
    }

    @Override
    public boolean delete(Integer integer) {
        return false;
    }
}
