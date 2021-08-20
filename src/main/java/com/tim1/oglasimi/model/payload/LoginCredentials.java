package com.tim1.oglasimi.model.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class LoginCredentials {

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]+([\\.\\-\\+][a-zA-Z0-9]+)*@([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}$")
    @Size( max = 320 )
    private String email;

    @NotBlank
    @Pattern(regexp = "^[0-9a-f]+$")
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
