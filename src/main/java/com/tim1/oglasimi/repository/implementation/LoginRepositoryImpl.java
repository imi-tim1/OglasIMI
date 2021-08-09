package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.LoginCredentials;
import com.tim1.oglasimi.model.LoginResponse;
import com.tim1.oglasimi.repository.LoginRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.List;

import static com.tim1.oglasimi.security.SecurityConfig.*;

@Repository
public class LoginRepositoryImpl implements LoginRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoginRepositoryImpl.class);
    private static final String LOGIN_STORED_PROCEDURE = "{call checkCredentials(?,?,?,?,?,?)}";

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
                        DATABASE_LOCATION_URI, DATABASE_USERNAME, DATABASE_PASSWORD);
                CallableStatement cstmt = con.prepareCall( LOGIN_STORED_PROCEDURE ) ) {

            cstmt.setString("email", loginCredentials.getEmail() );
            cstmt.setString("password", loginCredentials.getHashedPassword() );

            cstmt.registerOutParameter("user_id", Types.INTEGER);
            cstmt.registerOutParameter("validCreds", Types.BOOLEAN);
            cstmt.registerOutParameter("approved", Types.BOOLEAN);
            cstmt.registerOutParameter("role", Types.VARCHAR);

            cstmt.executeUpdate();

            loginResponse = new LoginResponse(
                    cstmt.getInt("user_id"),
                    cstmt.getBoolean("validCreds"),
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
