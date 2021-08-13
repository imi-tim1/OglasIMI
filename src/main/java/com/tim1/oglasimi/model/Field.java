package com.tim1.oglasimi.model;

import javax.validation.constraints.*;

public class Field
{
    @Min(1)
    @Max(Integer.MAX_VALUE)
    private int id;

    @NotBlank
    @NotNull
    @Size( min = 2, max = 30, message = "The length of name must be between 2 and 30 characters" )
    private String name;

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }
}
