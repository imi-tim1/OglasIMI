package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.LoginCredentials;
import com.tim1.oglasimi.model.LoginResponse;
import com.tim1.oglasimi.repository.LoginRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.List;

@Repository
public class LoginRepositoryImpl implements LoginRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoginRepositoryImpl.class);
    private static final String LOGIN_STORED_PROCEDURE_CALL = "{call checkCredentials(?,?,?,?,?,?)}";

    @Value("${spring.datasource.url}")
    private String databaseSourceUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Override
    public List<LoginCredentials> getAll() {
        return null;
    }

    @Override
    public boolean create(LoginCredentials loginCredentials) {
        return false;
    }

    @Override
    public LoginCredentials get(Integer integer) {
        return null;
    }

    @Override
    public boolean update(LoginCredentials loginCredentials, Integer integer) {
        return false;
    }

    @Override
    public boolean delete(Integer integer) {
        return false;
    }

    @Override
    public LoginResponse checkCredentials(LoginCredentials loginCredentials) {
        LoginResponse loginResponse = null;

        try (
                Connection con = DriverManager.getConnection(
                        databaseSourceUrl, databaseUsername, databasePassword );
                CallableStatement cstmt = con.prepareCall( LOGIN_STORED_PROCEDURE_CALL ) ) {

            cstmt.setString("p_email", loginCredentials.getEmail() );
            cstmt.setString("p_hashed_password", loginCredentials.getHashedPassword() );

            cstmt.registerOutParameter("p_user_id", Types.INTEGER);
            cstmt.registerOutParameter("p_valid_creds", Types.BOOLEAN);
            cstmt.registerOutParameter("p_approved", Types.BOOLEAN);
            cstmt.registerOutParameter("p_role", Types.VARCHAR);

            cstmt.executeUpdate();

            loginResponse = new LoginResponse(
                    cstmt.getInt("user_id"),
                    cstmt.getBoolean("valid_creds"),
                    cstmt.getBoolean("approved"),
                    cstmt.getString("role")
            );

        } catch ( SQLException e ) {
            LOGGER.debug("checkCredentials | An error occurred while communicating with a database", e );
            e.printStackTrace();
        }

        return loginResponse;
    }


}
