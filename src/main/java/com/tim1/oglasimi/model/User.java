package com.tim1.oglasimi.model;

import javax.validation.constraints.Max;

public class User {
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
