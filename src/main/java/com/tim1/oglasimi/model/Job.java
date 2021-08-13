package com.tim1.oglasimi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
//Cao
public class Job
{
    @Min(1)
    @Max(Integer.MAX_VALUE)
    private int id;

    private Employer employer;
    private Field field;
    private City city;
    private List<Tag> tags;

    @NotBlank @NotNull
    @DateTimeFormat
    private Date postDate;

    @NotBlank @NotNull
    @Size( min = 3, max = 50, message = "The length of title must be between 3 and 50 characters" )
    private String title;

    @NotBlank @NotNull
    @Size(min = 10, max = 500, message = "The length of description must be between 10 and 500 characters")
    private String description;

    private String salary;
    private boolean workFromHome;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }

    public Field getField() {
        return field;
    }

    public void setField(Field field) {
        this.field = field;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public boolean isWorkFromHome() {
        return workFromHome;
    }

    public void setWorkFromHome(boolean workFromHome) {
        this.workFromHome = workFromHome;
    }
}
