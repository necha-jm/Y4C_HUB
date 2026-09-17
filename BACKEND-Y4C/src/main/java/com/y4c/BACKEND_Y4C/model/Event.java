package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    @Column(columnDefinition = "TEXT")
    private String description;
    private LocalDateTime date;
    private String timeRange; // e.g., "9:00 AM - 5:00 PM"
    private String location;
    private String imageUrl;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "event_images", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "image_url")
    private java.util.List<String> images;
    
    private LocalDateTime expiryDate;
    private Boolean isPublished = true;

    public Event() {}

    public Event(Long id, String title, String description, LocalDateTime date, String timeRange, String location, String imageUrl, java.util.List<String> images, LocalDateTime expiryDate, Boolean isPublished) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.timeRange = timeRange;
        this.location = location;
        this.imageUrl = imageUrl;
        this.images = images;
        this.expiryDate = expiryDate;
        this.isPublished = isPublished;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
    public String getTimeRange() { return timeRange; }
    public void setTimeRange(String timeRange) { this.timeRange = timeRange; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public java.util.List<String> getImages() { return images; }
    public void setImages(java.util.List<String> images) { this.images = images; }
    public LocalDateTime getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; }
    public Boolean getIsPublished() { return isPublished; }
    public void setIsPublished(Boolean isPublished) { this.isPublished = isPublished; }

    @PrePersist
    protected void onCreate() {
        if (expiryDate == null) {
            expiryDate = date; // Default to event date
        }
    }
}
