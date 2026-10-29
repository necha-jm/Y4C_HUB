package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "co_founder_posts")
public class CoFounderPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long authorId;
    private String authorName;
    private String projectName;
    private String lookingFor;
    private String equityOrPerk;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String tags; // Comma separated or json
    private LocalDateTime createdAt = LocalDateTime.now();

    public CoFounderPost() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getAuthorId() { return authorId; }
    public void setAuthorId(Long authorId) { this.authorId = authorId; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }
    public String getLookingFor() { return lookingFor; }
    public void setLookingFor(String lookingFor) { this.lookingFor = lookingFor; }
    public String getEquityOrPerk() { return equityOrPerk; }
    public void setEquityOrPerk(String equityOrPerk) { this.equityOrPerk = equityOrPerk; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
