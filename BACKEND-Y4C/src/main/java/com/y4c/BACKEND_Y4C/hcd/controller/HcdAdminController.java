package com.y4c.BACKEND_Y4C.hcd.controller;

import com.y4c.BACKEND_Y4C.hcd.model.*;
import com.y4c.BACKEND_Y4C.hcd.service.HcdService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hcd/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class HcdAdminController {

    private final HcdService hcdService;

    public HcdAdminController(HcdService hcdService) {
        this.hcdService = hcdService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(hcdService.getHcdStats());
    }

    @PostMapping("/research")
    public ResponseEntity<HcdUserResearch> createResearch(@RequestBody HcdUserResearch research) {
        return ResponseEntity.ok(hcdService.saveUserResearch(research));
    }

    @GetMapping("/research")
    public ResponseEntity<List<HcdUserResearch>> getAllResearch() {
        return ResponseEntity.ok(hcdService.getAllUserResearch());
    }

    @PutMapping("/feedback/{id}/status")
    public ResponseEntity<HcdFeedback> updateStatus(@PathVariable Long id, @RequestParam String status, @RequestParam Long userId) {
        return ResponseEntity.ok(hcdService.updateFeedbackStatus(id, status, userId));
    }

    @GetMapping("/insights")
    public ResponseEntity<List<HcdInsight>> getInsights() {
        return ResponseEntity.ok(hcdService.getLatestInsights());
    }

    @PostMapping("/insights/generate")
    public ResponseEntity<Void> generateInsights() {
        hcdService.generateInsights();
        return ResponseEntity.ok().build();
    }
}
