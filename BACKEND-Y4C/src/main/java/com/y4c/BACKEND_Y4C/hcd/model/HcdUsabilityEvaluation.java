package com.y4c.BACKEND_Y4C.hcd.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hcd_usability_evaluation")
public class HcdUsabilityEvaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long feedbackId;
    private Integer easeOfUse;
    private Integer satisfaction;
    private Boolean goalAchieved;
    @Column(columnDefinition = "TEXT")
    private String confusionPoints;
    private Boolean reuseLikelihood;
    private Integer recommendScore;
    @Column(columnDefinition = "TEXT")
    private String comments;
    private String pageModule;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getFeedbackId() { return feedbackId; }
    public void setFeedbackId(Long feedbackId) { this.feedbackId = feedbackId; }
    public Integer getEaseOfUse() { return easeOfUse; }
    public void setEaseOfUse(Integer easeOfUse) { this.easeOfUse = easeOfUse; }
    public Integer getSatisfaction() { return satisfaction; }
    public void setSatisfaction(Integer satisfaction) { this.satisfaction = satisfaction; }
    public Boolean getGoalAchieved() { return goalAchieved; }
    public void setGoalAchieved(Boolean goalAchieved) { this.goalAchieved = goalAchieved; }
    public String getConfusionPoints() { return confusionPoints; }
    public void setConfusionPoints(String confusionPoints) { this.confusionPoints = confusionPoints; }
    public Boolean getReuseLikelihood() { return reuseLikelihood; }
    public void setReuseLikelihood(Boolean reuseLikelihood) { this.reuseLikelihood = reuseLikelihood; }
    public Integer getRecommendScore() { return recommendScore; }
    public void setRecommendScore(Integer recommendScore) { this.recommendScore = recommendScore; }
    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }
    public String getPageModule() { return pageModule; }
    public void setPageModule(String pageModule) { this.pageModule = pageModule; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
