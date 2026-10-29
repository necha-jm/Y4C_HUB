package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.Application;
import com.y4c.BACKEND_Y4C.repository.ApplicationRepository;
import com.y4c.BACKEND_Y4C.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ApplicationController {

    private final ApplicationService applicationService;
    private final ApplicationRepository applicationRepository;

    public ApplicationController(ApplicationService applicationService, ApplicationRepository applicationRepository) {
        this.applicationService = applicationService;
        this.applicationRepository = applicationRepository;
    }

    @PostMapping
    public Application submitApplication(@RequestBody Application application) {
        return applicationService.submitApplication(application);
    }

    @GetMapping("/user/{userId}")
    public List<Application> getApplicationsByUserId(@PathVariable Long userId) {
        return applicationService.getApplicationsByUserId(userId);
    }
    
    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(@PathVariable Long id, @RequestBody Application body) {
        return applicationRepository.findById(id).map(app -> {
            app.setStatus(body.getStatus());
            return ResponseEntity.ok(applicationRepository.save(app));
        }).orElse(ResponseEntity.notFound().build());
    }
}
