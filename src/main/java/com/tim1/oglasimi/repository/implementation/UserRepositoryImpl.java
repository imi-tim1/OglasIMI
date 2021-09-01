package com.tim1.oglasimi.repository.implementation;

import com.tim1.oglasimi.model.User;
import com.tim1.oglasimi.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.List;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserRepositoryImpl.class);

    private static final String GET_USER_PROCEDURE_CALL = "{call get_user(?)}";

    @Value("${spring.datasource.url}")
    private String databaseSourceUrl;

    @Value("${spring.datasource.username}")
    private String databaseUsername;

    @Value("${spring.datasource.password}")
    private String databasePassword;

    @Override
    public List<User> getAll() {
        return null;
    }

    @Override
    public boolean create(User user) {
        return false;
    }

    @Override
    public User get(Integer integer) {
        User user = null;

        try (Connection con = DriverManager.getConnection( databaseSourceUrl, databaseUsername, databasePassword );
             CallableStatement cstmt = con.prepareCall(GET_USER_PROCEDURE_CALL) ) {

            cstmt.setInt("p_id", integer);
            ResultSet resultSet = cstmt.executeQuery();

            if( resultSet.first() ) {
                user = new User();
                int id = resultSet.getInt("user_id");
                String email = resultSet.getString("email");
                String hashedPassword = resultSet.getString("hashed_password");

                user.setId(id);
                user.setEmail(email);
                user.setHashedPassword(hashedPassword);
            }

        } catch ( SQLException e ) {
            LOGGER.error("get | An error occurred while communicating with a database", e );
            e.printStackTrace();
        }

        return user;
    }

    @Override
    public boolean update(User user, Integer integer) {
        return false;
    }

    @Override
    public boolean delete(Integer integer) {
        return false;
    }
}
