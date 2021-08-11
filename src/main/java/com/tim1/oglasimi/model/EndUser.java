package com.tim1.oglasimi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"id", "jwt"})
public class EndUser extends Model {
    private int id;
    private String email;
    private String hashedPassword;
    private String pictureBase64;
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
