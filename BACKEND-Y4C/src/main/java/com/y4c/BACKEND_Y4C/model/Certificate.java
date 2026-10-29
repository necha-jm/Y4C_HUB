package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "certificates")
public class Certificate {
    @Id
    private String id; // e.g. Y4C-CERT-2026-001

    private String recipientName;
    private String programTitle;
    private String issueDate;
    private String verificationCode;
    private String status = "ISSUED";

    public Certificate() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getRecipientName() { return recipientName; }
    public void setRecipientName(String recipientName) { this.recipientName = recipientName; }
    public String getProgramTitle() { return programTitle; }
    public void setProgramTitle(String programTitle) { this.programTitle = programTitle; }
    public String getIssueDate() { return issueDate; }
    public void setIssueDate(String issueDate) { this.issueDate = issueDate; }
    public String getVerificationCode() { return verificationCode; }
    public void setVerificationCode(String verificationCode) { this.verificationCode = verificationCode; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
