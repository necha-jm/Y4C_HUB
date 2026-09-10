package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Entity
@Table(name = "programs")
public class Program {
    @Id
    private String id;
    
    private String title;
    
    private String description;
    
    @JdbcTypeCode(SqlTypes.JSON)
    private List<Activity> activities;
    
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> images;

    public Program() {}

    public Program(String id, String title, String description, List<Activity> activities, List<String> images) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.activities = activities;
        this.images = images;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<Activity> getActivities() { return activities; }
    public void setActivities(List<Activity> activities) { this.activities = activities; }
    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }
}
