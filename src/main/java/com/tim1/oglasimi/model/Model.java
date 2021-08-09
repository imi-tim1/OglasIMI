package com.tim1.oglasimi.model;

public class Model
{
    public String jwt;

    public Model() {
    }

    public Model(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt)
    {
        this.jwt = jwt;
    }
}
