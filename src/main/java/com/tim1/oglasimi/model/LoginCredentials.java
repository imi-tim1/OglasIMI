package com.tim1.oglasimi.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class LoginCredentials extends Model {

    @NotBlank
    @NotNull
    @Email( message = "Email address is not valid" )
    private String email;

    @NotNull
    @Size( max = 300, message = "Hashed password length exceeded maximum allowed length" )
    private String hashedPassword;

    public LoginCredentials(String email, String hashedPassword) {
        this.email = email;
        this.hashedPassword = hashedPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    @Override
    public String toString() {
        return "LoginCredentials{" +
                "email='" + email + '\'' +
                ", hashedPassword='" + hashedPassword + '\'' +
                '}';
    }
}
