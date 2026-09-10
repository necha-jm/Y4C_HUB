package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String programId;
    
    private Long userId;
    
    private String status;
    
    private LocalDateTime appliedAt;

    public Application() {}

    public Application(Long id, String programId, Long userId, String status, LocalDateTime appliedAt) {
        this.id = id;
        this.programId = programId;
        this.userId = userId;
        this.status = status;
        this.appliedAt = appliedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProgramId() { return programId; }
    public void setProgramId(String programId) { this.programId = programId; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }

    @PrePersist
    protected void onCreate() {
        appliedAt = LocalDateTime.now();
        if (status == null) {
            status = "PENDING";
        }
    }
}
