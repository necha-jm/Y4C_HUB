package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private Long userId;
    private String innovatorName;
    private String innovatorEmail;
    private String institution;
    private String category;
    private String proposalPdfUrl;
    private String programId;
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED
    private String githubUrl;
    private String portfolioUrl;
    private LocalDateTime submittedAt = LocalDateTime.now();

    public Project() {}

    public Project(Long id, String title, String description, Long userId, String innovatorName, String innovatorEmail, String institution, String category, String proposalPdfUrl, String programId, String status, String githubUrl, String portfolioUrl, LocalDateTime submittedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.innovatorName = innovatorName;
        this.innovatorEmail = innovatorEmail;
        this.institution = institution;
        this.category = category;
        this.proposalPdfUrl = proposalPdfUrl;
        this.programId = programId;
        this.status = status;
        this.githubUrl = githubUrl;
        this.portfolioUrl = portfolioUrl;
        this.submittedAt = submittedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getInnovatorName() { return innovatorName; }
    public void setInnovatorName(String innovatorName) { this.innovatorName = innovatorName; }
    public String getInnovatorEmail() { return innovatorEmail; }
    public void setInnovatorEmail(String innovatorEmail) { this.innovatorEmail = innovatorEmail; }
    public String getInstitution() { return institution; }
    public void setInstitution(String institution) { this.institution = institution; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getProposalPdfUrl() { return proposalPdfUrl; }
    public void setProposalPdfUrl(String proposalPdfUrl) { this.proposalPdfUrl = proposalPdfUrl; }
    public String getProgramId() { return programId; }
    public void setProgramId(String programId) { this.programId = programId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }
    public String getPortfolioUrl() { return portfolioUrl; }
    public void setPortfolioUrl(String portfolioUrl) { this.portfolioUrl = portfolioUrl; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
