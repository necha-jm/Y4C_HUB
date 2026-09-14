package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "lab_projects")
@Data
public class LabProject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String subtitle;
    
    private String primaryColor;
    private String secondaryColor;
    private String accentColor;
    
    private String logoUrl;
    private String heroImageUrl;
    
    private boolean isActive;
}
