package com.tim1.oglasimi.model;

public class Employer extends EndUser {
    private String name;
    private String address;
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
                "name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", tin='" + tin + '\'' +
                ", jwt='" + jwt + '\'' +
                '}';
    }
}
