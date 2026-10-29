package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.IncubationMilestone;
import com.y4c.BACKEND_Y4C.repository.IncubationMilestoneRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/incubation")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class IncubationController {

    private final IncubationMilestoneRepository milestoneRepository;

    public IncubationController(IncubationMilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    @GetMapping("/milestones")
    public ResponseEntity<List<IncubationMilestone>> getMilestones() {
        return ResponseEntity.ok(milestoneRepository.findAll());
    }

    @PutMapping("/milestones/{id}")
    public ResponseEntity<IncubationMilestone> updateMilestone(@PathVariable Long id, @RequestBody IncubationMilestone body) {
        return milestoneRepository.findById(id).map(m -> {
            if (body.getCurrentStage() != null) m.setCurrentStage(body.getCurrentStage());
            if (body.getProgress() != null) m.setProgress(body.getProgress());
            if (body.getMilestonesJson() != null) m.setMilestonesJson(body.getMilestonesJson());
            return ResponseEntity.ok(milestoneRepository.save(m));
        }).orElse(ResponseEntity.notFound().build());
    }
}
