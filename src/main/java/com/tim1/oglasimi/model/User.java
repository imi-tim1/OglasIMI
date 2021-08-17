package com.tim1.oglasimi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.*;

public class User {

    @Min( 0 )
    @Max( Integer.MAX_VALUE )
    private int id;


    @NotBlank
    @Pattern(regexp = "^[a-zA-Z .\\-@!#$%&'*+-/=?^_`{|}~\"(),:;<>\\[\\]]+$")
    @Size( max = 320 )
    @Email( message = "Email address is not valid" )
    private String email;

    @NotBlank
    @Pattern(regexp = "^[0-9a-f]+$")
    @Size( max = 300, message = "Hashed password length exceeded maximum allowed length" )
    private String hashedPassword;

    public User() {
    }

    public User(int id, String email, String hashedPassword) {
        this.id = id;
        this.email = email;
        this.hashedPassword = hashedPassword;
    }

    @JsonProperty
    public int getId() {
        return id;
    }

    @JsonIgnore
    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email.toLowerCase();
    }

    @JsonIgnore
    public String getHashedPassword() {
        return hashedPassword;
    }

    @JsonProperty
    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", hashedPassword='" + hashedPassword + '\'' +
                '}';
    }
}
