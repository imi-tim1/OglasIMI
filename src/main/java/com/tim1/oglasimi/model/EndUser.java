package com.tim1.oglasimi.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class EndUser extends User {

    @Size( min = 5000, max = 65000,
            message = "The length for base64 encoded picture must be between 5000 and 65000 characters" )
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
        super(id,email,hashedPassword);
        this.pictureBase64 = pictureBase64;
        this.phoneNumber = phoneNumber;
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
                "id=" + super.getId() +
                ", email='" + super.getEmail() + '\'' +
                ", hashedPassword='" + super.getHashedPassword() + '\'' +
                ", pictureBase64='" + pictureBase64 + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
