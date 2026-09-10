package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.Project;
import com.y4c.BACKEND_Y4C.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProjectController {

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @PostMapping
    public ResponseEntity<Project> submitProject(@RequestBody Project project) {
        project.setStatus("PENDING");
        return ResponseEntity.ok(projectRepository.save(project));
    }

    @PostMapping("/apply")
    public ResponseEntity<Project> applyForHub(@RequestBody Project project) {
        project.setStatus("PENDING");
        return ResponseEntity.ok(projectRepository.save(project));
    }
}
