package com.tim1.oglasimi.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class Employer extends EndUser {

    @NotBlank
    @Pattern(regexp = "^[a-zA-ZšŠđĐčČćĆžŽ .\"'\\-]+$")
    @Size( min = 1, max = 30)
    private String name;

    @NotBlank
    @Pattern(regexp = "^[0-9a-zA-Z()šŠđĐčČćĆžŽ ,\\-.'/&:]+$")
    @Size( min = 1, max = 50 )
    private String address;

    @NotBlank
    @Pattern(regexp = "^[0-9]+$")
    @Size( min = 9, max = 9 )
    private String tin;

    public Employer() {
    }

    public Employer(
            int id,
            String email,
            String hashedPassword,
            String pictureBase64,
            String phoneNumber,
            String name,
            String address,
            String tin ) {
        super( id, email, hashedPassword, pictureBase64, phoneNumber );
        this.name = name;
        this.address = address;
        this.tin = tin;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTin() {
        return tin;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }

    @Override
    public String toString() {
        return "Employer{" +
                "id=" + super.getId() +
                ", email='" + super.getEmail() + '\'' +
                ", hashedPassword='" + super.getHashedPassword() + '\'' +
                ", pictureBase64='" + super.getPictureBase64() + '\'' +
                ", phoneNumber='" + super.getPhoneNumber() + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", tin='" + tin + '\'' +
                '}';
    }
}
