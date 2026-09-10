package com.y4c.BACKEND_Y4C.hcd.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hcd_user_validation")
public class HcdUserValidation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long feedbackId;
    private String validationResult;
    @Column(columnDefinition = "TEXT")
    private String explanation;
    private LocalDateTime validatedAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getFeedbackId() { return feedbackId; }
    public void setFeedbackId(Long feedbackId) { this.feedbackId = feedbackId; }
    public String getValidationResult() { return validationResult; }
    public void setValidationResult(String validationResult) { this.validationResult = validationResult; }
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public LocalDateTime getValidatedAt() { return validatedAt; }
    public void setValidatedAt(LocalDateTime validatedAt) { this.validatedAt = validatedAt; }
}
