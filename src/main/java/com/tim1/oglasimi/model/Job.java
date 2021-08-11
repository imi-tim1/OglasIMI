package com.tim1.oglasimi.model;

import java.time.LocalDate;
import java.util.List;
//Cao
public class Job
{
    private int id;
    //private Employer employer;
    private Field field;
    private List<Tag> tags;
    private LocalDate post_date;
    private String title;
    private String description;
    private String salary;
    private String city;
    private boolean workFromHome;

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public Field getField()
    {
        return field;
    }

    public void setField(Field field)
    {
        this.field = field;
    }

    public List<Tag> getTags()
    {
        return tags;
    }

    public void setTags(List<Tag> tags)
    {
        this.tags = tags;
    }

    public LocalDate getPost_date()
    {
        return post_date;
    }

    public void setPost_date(LocalDate post_date)
    {
        this.post_date = post_date;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getDescription()
    {
        return description;
    }

    public void setDescription(String description)
    {
        this.description = description;
    }

    public String getSalary()
    {
        return salary;
    }

    public void setSalary(String salary)
    {
        this.salary = salary;
    }

    public String getCity()
    {
        return city;
    }

    public void setCity(String city)
    {
        this.city = city;
    }

    public boolean isWorkFromHome()
    {
        return workFromHome;
    }

    public void setWorkFromHome(boolean workFromHome)
    {
        this.workFromHome = workFromHome;
    }
}
