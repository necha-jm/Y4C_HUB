package com.y4c.BACKEND_Y4C.hcd.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hcd_status_history")
public class HcdStatusHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long feedbackId;
    private String oldStatus;
    private String newStatus;
    private Long changedBy;
    private LocalDateTime changedAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getFeedbackId() { return feedbackId; }
    public void setFeedbackId(Long feedbackId) { this.feedbackId = feedbackId; }
    public String getOldStatus() { return oldStatus; }
    public void setOldStatus(String oldStatus) { this.oldStatus = oldStatus; }
    public String getNewStatus() { return newStatus; }
    public void setNewStatus(String newStatus) { this.newStatus = newStatus; }
    public Long getChangedBy() { return changedBy; }
    public void setChangedBy(Long changedBy) { this.changedBy = changedBy; }
    public LocalDateTime getChangedAt() { return changedAt; }
    public void setChangedAt(LocalDateTime changedAt) { this.changedAt = changedAt; }
}
