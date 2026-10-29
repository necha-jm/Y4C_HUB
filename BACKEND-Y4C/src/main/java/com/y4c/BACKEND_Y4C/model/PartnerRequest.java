package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "partner_requests")
public class PartnerRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String institutionName;
    private String contactPerson;
    private String email;
    private String phone;
    private String country;
    private String partnerType; // CORPORATE, ACADEMIC, INTERNATIONAL, COMMUNITY, HEALTH, DEVELOPMENT
    private String website;
    private String location;
    
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String collaborationGoal;
    
    private String logoUrl;
    private Boolean isPublished = false;
    
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED
    private LocalDateTime submittedAt = LocalDateTime.now();

    public PartnerRequest() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getInstitutionName() { return institutionName; }
    public void setInstitutionName(String institutionName) { this.institutionName = institutionName; }
    public String getContactPerson() { return contactPerson; }
    public void setContactPerson(String contactPerson) { this.contactPerson = contactPerson; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public String getPartnerType() { return partnerType; }
    public void setPartnerType(String partnerType) { this.partnerType = partnerType; }
    public String getWebsite() { return website; }
    public void setWebsite(String website) { this.website = website; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCollaborationGoal() { return collaborationGoal; }
    public void setCollaborationGoal(String collaborationGoal) { this.collaborationGoal = collaborationGoal; }
    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }
    public Boolean getIsPublished() { return isPublished; }
    public void setIsPublished(Boolean isPublished) { this.isPublished = isPublished; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
}
