package com.tim1.oglasimi.model;

import javax.validation.constraints.*;

public class Tag
{
    @Min(1)
    @Max(Integer.MAX_VALUE)
    private int id;

    @Min(1)
    @Max(Integer.MAX_VALUE)
    private int fieldId;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9 \\-]+$")
    @Size( min = 2, max = 30, message = "The length of name must be between 2 and 30 characters" )
    private String name;

    public Tag() {
    }

    public Tag(int id, int fieldId, String name) {
        this.id = id;
        this.fieldId = fieldId;
        this.name = name;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public int getFieldId()
    {
        return fieldId;
    }

    public void setFieldId(int fieldId)
    {
        this.fieldId = fieldId;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }


    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", fieldId=" + fieldId +
                ", name='" + name + '\'' +
                '}';
    }
}
