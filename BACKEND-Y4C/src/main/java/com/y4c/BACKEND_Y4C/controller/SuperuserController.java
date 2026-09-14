package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.LabProject;
import com.y4c.BACKEND_Y4C.service.SuperuserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/superuser")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class SuperuserController {

    private final SuperuserService superuserService;

    public SuperuserController(SuperuserService superuserService) {
        this.superuserService = superuserService;
    }

    @GetMapping("/projects")
    public ResponseEntity<List<LabProject>> getAllProjects() {
        return ResponseEntity.ok(superuserService.getAllProjects());
    }

    @PostMapping("/projects")
    public ResponseEntity<LabProject> createProject(@RequestBody LabProject project) {
        return ResponseEntity.ok(superuserService.createProject(project));
    }

    @PutMapping("/projects/{id}/activate")
    public ResponseEntity<LabProject> activateProject(@PathVariable Long id) {
        return ResponseEntity.ok(superuserService.activateProject(id));
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<LabProject> updateProject(@PathVariable Long id, @RequestBody LabProject project) {
        return ResponseEntity.ok(superuserService.updateProject(id, project));
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        superuserService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
