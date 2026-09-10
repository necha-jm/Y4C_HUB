package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;

@Entity
@Table(name = "experts")
public class Expert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    private String profilePicture;
    private Integer displayOrder;
    
    private Long parentId;

    public Expert() {}

    public Expert(Long id, String name, String title, String bio, String profilePicture, Integer displayOrder, Long parentId) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.bio = bio;
        this.profilePicture = profilePicture;
        this.displayOrder = displayOrder;
        this.parentId = parentId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }
    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
    public Long getParentId() { return parentId; }
    public void setParentId(Long parentId) { this.parentId = parentId; }
}
