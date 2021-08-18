package com.tim1.oglasimi.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class Applicant extends EndUser {
    @NotBlank
    @Pattern(regexp = "^[a-zA-ZšŠđĐčČćĆžŽ \\-]+$")
    @Size( min = 1, max = 30)
    private String firstName;

    @NotBlank
    @Pattern(regexp = "^[a-zA-šŠđĐčČćĆžŽ \\-]+$")
    @Size( min = 1, max = 30)
    private String lastName;

    public Applicant() {
    }

    public Applicant(
            int id,
            String email,
            String hashedPassword,
            String pictureBase64,
            String phoneNumber,
            String firstName,
            String lastName) {
        super(id, email, hashedPassword, pictureBase64, phoneNumber);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "Applicant{" +
                "id=" + super.getId() +
                ", email='" + super.getEmail() + '\'' +
                ", hashedPassword='" + super.getHashedPassword() + '\'' +
                ", pictureBase64='" + super.getPictureBase64() + '\'' +
                ", phoneNumber='" + super.getPhoneNumber() + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                '}';
    }
}
