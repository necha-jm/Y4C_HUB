package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_hosting_requests")
public class ProjectHostingRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String studentName;
    private String studentEmail;
    private String projectName;
    private String gitRepositoryUrl;
    private String techStack; // Node.js, Spring Boot, Python/Django, Docker, PHP
    private String requestedSubdomain; // e.g. "lishe-app" -> lishe-app.y4chub.udsm.ac.tz
    private String databaseNeeded; // PostgreSQL, MySQL, MongoDB, None
    private String environmentVariables;

    @Column(columnDefinition = "TEXT")
    private String deploymentNotes;

    // Status: PENDING_APPROVAL, ACTIVE, REJECTED, SUSPENDED
    private String status = "PENDING_APPROVAL";

    // Coordinator Provisioning Details
    private String liveUrl; // e.g. https://lishe-app.y4chub.udsm.ac.tz
    private String serverIp; // e.g. 196.216.240.42 (UDSM CoICT DataCenter)
    private Integer allocatedPort;
    private String accessCredentials; // SSH or Deployment Webhook Token
    private String coordinatorRemarks;
    private LocalDateTime provisionedAt;

    private LocalDateTime requestedAt = LocalDateTime.now();

    public ProjectHostingRequest() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }
    public String getProjectName() { return projectName; }
    public void setProjectName(String projectName) { this.projectName = projectName; }
    public String getGitRepositoryUrl() { return gitRepositoryUrl; }
    public void setGitRepositoryUrl(String gitRepositoryUrl) { this.gitRepositoryUrl = gitRepositoryUrl; }
    public String getTechStack() { return techStack; }
    public void setTechStack(String techStack) { this.techStack = techStack; }
    public String getRequestedSubdomain() { return requestedSubdomain; }
    public void setRequestedSubdomain(String requestedSubdomain) { this.requestedSubdomain = requestedSubdomain; }
    public String getDatabaseNeeded() { return databaseNeeded; }
    public void setDatabaseNeeded(String databaseNeeded) { this.databaseNeeded = databaseNeeded; }
    public String getEnvironmentVariables() { return environmentVariables; }
    public void setEnvironmentVariables(String environmentVariables) { this.environmentVariables = environmentVariables; }
    public String getDeploymentNotes() { return deploymentNotes; }
    public void setDeploymentNotes(String deploymentNotes) { this.deploymentNotes = deploymentNotes; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }
    public String getServerIp() { return serverIp; }
    public void setServerIp(String serverIp) { this.serverIp = serverIp; }
    public Integer getAllocatedPort() { return allocatedPort; }
    public void setAllocatedPort(Integer allocatedPort) { this.allocatedPort = allocatedPort; }
    public String getAccessCredentials() { return accessCredentials; }
    public void setAccessCredentials(String accessCredentials) { this.accessCredentials = accessCredentials; }
    public String getCoordinatorRemarks() { return coordinatorRemarks; }
    public void setCoordinatorRemarks(String coordinatorRemarks) { this.coordinatorRemarks = coordinatorRemarks; }
    public LocalDateTime getProvisionedAt() { return provisionedAt; }
    public void setProvisionedAt(LocalDateTime provisionedAt) { this.provisionedAt = provisionedAt; }
    public LocalDateTime getRequestedAt() { return requestedAt; }
    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }
}
