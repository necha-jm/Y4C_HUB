package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId;
    private String type; // EQUIPMENT, MENTORSHIP, LAB_SPACE, OTHER
    private String subject;
    
    @Column(columnDefinition = "TEXT")
    private String message;
    
    private String status = "PENDING"; // PENDING, IN_PROGRESS, RESOLVED
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(columnDefinition = "TEXT")
    private String facilitatorResponse;

    public Request() {}

    public Request(Long id, Long userId, String type, String subject, String message, String status, LocalDateTime createdAt, String facilitatorResponse) {
        this.id = id;
        this.userId = userId;
        this.type = type;
        this.subject = subject;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
        this.facilitatorResponse = facilitatorResponse;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public String getFacilitatorResponse() { return facilitatorResponse; }
    public void setFacilitatorResponse(String facilitatorResponse) { this.facilitatorResponse = facilitatorResponse; }
}
