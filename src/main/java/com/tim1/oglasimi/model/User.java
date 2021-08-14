package com.tim1.oglasimi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class User {

    @Min( 0 )
    @Max( Integer.MAX_VALUE )
    private int id;

    public User() {
    }

    public User(int id) {
        this.id = id;
    }

    @JsonProperty
    public int getId() {
        return id;
    }

    @JsonIgnore
    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                '}';
    }
}
