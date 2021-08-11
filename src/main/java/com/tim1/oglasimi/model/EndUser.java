package com.tim1.oglasimi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.*;

@JsonIgnoreProperties({"id"})
public class EndUser extends User {
    @Max( Integer.MAX_VALUE )
    private int id;

    @NotBlank
    @NotNull
    @Email( message = "Email address is not valid" )
    private String email;

    @NotNull
    @NotBlank
    @Size( max = 300, message = "Hashed password length exceeded maximum allowed length" )
    private String hashedPassword;

    @Size( min = 5000, max = 65000,
            message = "The length for base64 encoded picture must be between 10000 and 65000 characters" )
    private String pictureBase64;

    @NotNull
    @Size( min = 9, max = 30, message = "The length for phone number must be between 9 and 30 characters" )
    private String phoneNumber;

    public EndUser() {
    }

    public EndUser(
            int id,
            String email,
            String hashedPassword,
            String pictureBase64,
            String phoneNumber) {
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.pictureBase64 = pictureBase64;
        this.phoneNumber = phoneNumber;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getPictureBase64() {
        return pictureBase64;
    }

    public void setPictureBase64(String pictureBase64) {
        this.pictureBase64 = pictureBase64;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public String toString() {
        return "EndUser{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", hashedPassword='" + hashedPassword + '\'' +
                ", pictureBase64='" + pictureBase64 + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", jwt='" + jwt + '\'' +
                '}';
    }
}
