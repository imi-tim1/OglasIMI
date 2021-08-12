package com.tim1.oglasimi.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class User {
    @Min( 1 )
    @Max( Integer.MAX_VALUE )
    private int id;

    public User() {
    }

    public User(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

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
