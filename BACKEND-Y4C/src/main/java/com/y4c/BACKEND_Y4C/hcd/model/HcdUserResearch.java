package com.y4c.BACKEND_Y4C.hcd.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "hcd_user_research")
public class HcdUserResearch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long researcherId;
    
    private String personaName;
    
    private String userRole;
    
    @Column(columnDefinition = "TEXT")
    private String goals;
    
    @Column(columnDefinition = "TEXT")
    private String needs;
    
    @Column(columnDefinition = "TEXT")
    private String painPoints;
    
    @Column(columnDefinition = "TEXT")
    private String expectations;
    
    @Column(columnDefinition = "TEXT")
    private String challenges;
    
    @Column(columnDefinition = "TEXT")
    private String commonTasks;
    
    @Column(columnDefinition = "TEXT")
    private String environmentContext;
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();

    public HcdUserResearch() {}

    public HcdUserResearch(Long id, Long researcherId, String personaName, String userRole, String goals, String needs, String painPoints, String expectations, String challenges, String commonTasks, String environmentContext, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.researcherId = researcherId;
        this.personaName = personaName;
        this.userRole = userRole;
        this.goals = goals;
        this.needs = needs;
        this.painPoints = painPoints;
        this.expectations = expectations;
        this.challenges = challenges;
        this.commonTasks = commonTasks;
        this.environmentContext = environmentContext;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getResearcherId() { return researcherId; }
    public void setResearcherId(Long researcherId) { this.researcherId = researcherId; }
    public String getPersonaName() { return personaName; }
    public void setPersonaName(String personaName) { this.personaName = personaName; }
    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
    public String getGoals() { return goals; }
    public void setGoals(String goals) { this.goals = goals; }
    public String getNeeds() { return needs; }
    public void setNeeds(String needs) { this.needs = needs; }
    public String getPainPoints() { return painPoints; }
    public void setPainPoints(String painPoints) { this.painPoints = painPoints; }
    public String getExpectations() { return expectations; }
    public void setExpectations(String expectations) { this.expectations = expectations; }
    public String getChallenges() { return challenges; }
    public void setChallenges(String challenges) { this.challenges = challenges; }
    public String getCommonTasks() { return commonTasks; }
    public void setCommonTasks(String commonTasks) { this.commonTasks = commonTasks; }
    public String getEnvironmentContext() { return environmentContext; }
    public void setEnvironmentContext(String environmentContext) { this.environmentContext = environmentContext; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
