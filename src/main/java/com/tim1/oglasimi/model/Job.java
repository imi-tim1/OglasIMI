package com.tim1.oglasimi.model;

import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

public class Job
{
    @Min(0)
    @Max(Integer.MAX_VALUE)
    private int id;

    private Employer employer;
    private Field field;
    private City city;
    private List<Tag> tags;

    @DateTimeFormat
    @PastOrPresent
    private LocalDateTime postDate;

    @NotBlank
    @Size( min = 3, max = 50, message = "The length of title must be between 3 and 50 characters" )
    private String title;

    @NotBlank
    @Size(min = 10, max = 500, message = "The length of description must be between 10 and 500 characters")
    private String description;

    @Size(min = 0, max = 50)
    private String salary;

    private boolean workFromHome;

    public Job() {
    }

    public Job(
            int id,
            Employer employer,
            Field field,
            City city,
            List<Tag> tags,
            LocalDateTime postDate,
            String title,
            String description,
            String salary,
            boolean workFromHome ) {
        this.id = id;
        this.employer = employer;
        this.field = field;
        this.city = city;
        this.tags = tags;
        this.postDate = postDate;
        this.title = title;
        this.description = description;
        this.salary = salary;
        this.workFromHome = workFromHome;
    }

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

    public LocalDateTime getPostDate() {
        return postDate;
    }

    public void setPostDate(LocalDateTime postDate) {
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
