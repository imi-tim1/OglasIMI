package com.tim1.oglasimi.model;

import java.time.LocalDateTime;

public class Comment
{
    private int id;
    private int parentId;
    private String authorName;
    private String text;
    private LocalDateTime postDate;

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public int getParentId()
    {
        return parentId;
    }

    public void setParentId(int parentId)
    {
        this.parentId = parentId;
    }

    public String getAuthorName()
    {
        return authorName;
    }

    public void setAuthorName(String authorName)
    {
        this.authorName = authorName;
    }

    public String getText()
    {
        return text;
    }

    public void setText(String text)
    {
        this.text = text;
    }

    public LocalDateTime getPostDate()
    {
        return postDate;
    }

    public void setPostDate(LocalDateTime postDate)
    {
        this.postDate = postDate;
    }
}
