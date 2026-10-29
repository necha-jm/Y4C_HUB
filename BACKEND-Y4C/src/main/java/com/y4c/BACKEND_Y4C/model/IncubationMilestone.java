package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;

@Entity
@Table(name = "incubation_milestones")
public class IncubationMilestone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long projectId;
    private String projectTitle;
    private String innovatorName;
    private String currentStage; // Ideation, Prototyping / MVP, Validation, Pitch / Demo Day
    private Integer progress = 0;

    @Column(columnDefinition = "TEXT")
    private String milestonesJson;

    public IncubationMilestone() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }
    public String getProjectTitle() { return projectTitle; }
    public void setProjectTitle(String projectTitle) { this.projectTitle = projectTitle; }
    public String getInnovatorName() { return innovatorName; }
    public void setInnovatorName(String innovatorName) { this.innovatorName = innovatorName; }
    public String getCurrentStage() { return currentStage; }
    public void setCurrentStage(String currentStage) { this.currentStage = currentStage; }
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
    public String getMilestonesJson() { return milestonesJson; }
    public void setMilestonesJson(String milestonesJson) { this.milestonesJson = milestonesJson; }
}
