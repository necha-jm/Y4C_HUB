package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.Project;
import com.y4c.BACKEND_Y4C.repository.ProjectRepository;
import com.y4c.BACKEND_Y4C.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final EmailService emailService;

    public ProjectController(ProjectRepository projectRepository, EmailService emailService) {
        this.projectRepository = projectRepository;
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<Project> submitProject(@RequestBody Project project) {
        project.setStatus("PENDING");
        Project saved = projectRepository.save(project);
        if (saved.getInnovatorEmail() != null && !saved.getInnovatorEmail().trim().isEmpty()) {
            emailService.sendProjectSubmissionNotification(saved.getInnovatorEmail(), saved.getInnovatorName(), saved.getTitle());
        }
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/apply")
    public ResponseEntity<Project> applyForHub(@RequestBody Project project) {
        project.setStatus("PENDING");
        Project saved = projectRepository.save(project);
        if (saved.getInnovatorEmail() != null && !saved.getInnovatorEmail().trim().isEmpty()) {
            emailService.sendProjectSubmissionNotification(saved.getInnovatorEmail(), saved.getInnovatorName(), saved.getTitle());
        }
        return ResponseEntity.ok(saved);
    }
}
