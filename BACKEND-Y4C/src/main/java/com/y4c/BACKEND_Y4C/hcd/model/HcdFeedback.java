package com.y4c.BACKEND_Y4C.hcd.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hcd_feedback")
public class HcdFeedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private String category;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String pageModule;
    private String severity;
    private String priority;
    private Integer rating;
    private String screenshotUrl;
    private String status = "NEW";
    @Column(columnDefinition = "TEXT")
    private String adminResponse;
    @Column(columnDefinition = "TEXT")
    private String resolution;
    private LocalDateTime resolutionDate;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPageModule() { return pageModule; }
    public void setPageModule(String pageModule) { this.pageModule = pageModule; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getScreenshotUrl() { return screenshotUrl; }
    public void setScreenshotUrl(String screenshotUrl) { this.screenshotUrl = screenshotUrl; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAdminResponse() { return adminResponse; }
    public void setAdminResponse(String adminResponse) { this.adminResponse = adminResponse; }
    public String getResolution() { return resolution; }
    public void setResolution(String resolution) { this.resolution = resolution; }
    public LocalDateTime getResolutionDate() { return resolutionDate; }
    public void setResolutionDate(LocalDateTime resolutionDate) { this.resolutionDate = resolutionDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
