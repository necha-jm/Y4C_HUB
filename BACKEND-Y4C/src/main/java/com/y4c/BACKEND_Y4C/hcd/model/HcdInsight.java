package com.y4c.BACKEND_Y4C.hcd.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hcd_insights")
public class HcdInsight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    @Column(columnDefinition = "TEXT")
    private String pattern;
    private String affectedModule;
    private Integer frequency;
    private Double impactScore;
    @Column(columnDefinition = "TEXT")
    private String aiSummary;
    @Column(columnDefinition = "TEXT")
    private String suggestedAction;
    private LocalDateTime generatedAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getPattern() { return pattern; }
    public void setPattern(String pattern) { this.pattern = pattern; }
    public String getAffectedModule() { return affectedModule; }
    public void setAffectedModule(String affectedModule) { this.affectedModule = affectedModule; }
    public Integer getFrequency() { return frequency; }
    public void setFrequency(Integer frequency) { this.frequency = frequency; }
    public Double getImpactScore() { return impactScore; }
    public void setImpactScore(Double impactScore) { this.impactScore = impactScore; }
    public String getAiSummary() { return aiSummary; }
    public void setAiSummary(String aiSummary) { this.aiSummary = aiSummary; }
    public String getSuggestedAction() { return suggestedAction; }
    public void setSuggestedAction(String suggestedAction) { this.suggestedAction = suggestedAction; }
    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }
}
