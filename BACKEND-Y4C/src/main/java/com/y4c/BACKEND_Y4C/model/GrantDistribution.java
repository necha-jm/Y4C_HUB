package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "grant_distributions")
public class GrantDistribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectTitle;
    private String category; // Prototyping Grant, Seed Exploration Grant
    private String amountTsh;
    private String status = "APPROVED"; // APPROVED, DISBURSED, COMPLETED
    private LocalDate date = LocalDate.now();
    private String purpose;
    private String receiptUrl;

    public GrantDistribution() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getProjectTitle() { return projectTitle; }
    public void setProjectTitle(String projectTitle) { this.projectTitle = projectTitle; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getAmountTsh() { return amountTsh; }
    public void setAmountTsh(String amountTsh) { this.amountTsh = amountTsh; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public String getReceiptUrl() { return receiptUrl; }
    public void setReceiptUrl(String receiptUrl) { this.receiptUrl = receiptUrl; }
}
