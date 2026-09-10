package com.y4c.BACKEND_Y4C.model;

public class Activity {
    private String title;
    private String description;

    public Activity() {}

    public Activity(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
