package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.*;
import com.y4c.BACKEND_Y4C.service.CoordinatorService;
import com.y4c.BACKEND_Y4C.service.ExpertService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/coordinator")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CoordinatorController {

    private final CoordinatorService coordinatorService;
    private final ExpertService expertService;

    public CoordinatorController(CoordinatorService coordinatorService, ExpertService expertService) {
        this.coordinatorService = coordinatorService;
        this.expertService = expertService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(coordinatorService.getDashboardStats());
    }

    @GetMapping("/schedule")
    public ResponseEntity<List<Timetable>> getSchedule() {
        return ResponseEntity.ok(coordinatorService.getUpcomingSchedule());
    }

    @GetMapping("/mentee-progress")
    public ResponseEntity<List<Map<String, Object>>> getMenteeProgress() {
        return ResponseEntity.ok(coordinatorService.getMenteeProgress());
    }

    @GetMapping("/facilitators/pending")
    public ResponseEntity<List<User>> getPendingFacilitators() {
        return ResponseEntity.ok(coordinatorService.getPendingFacilitators());
    }

    @PutMapping("/facilitators/{id}/admit")
    public ResponseEntity<User> admitFacilitator(@PathVariable Long id) {
        return ResponseEntity.ok(coordinatorService.admitFacilitator(id));
    }

    @PostMapping("/facilitators")
    public ResponseEntity<User> addFacilitator(@RequestBody User user) {
        return ResponseEntity.ok(coordinatorService.addFacilitator(user));
    }

    @DeleteMapping("/facilitators/{id}")
    public ResponseEntity<Void> deleteFacilitator(@PathVariable Long id) {
        coordinatorService.deleteFacilitator(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/projects/pending")
    public ResponseEntity<List<Project>> getPendingProjects() {
        return ResponseEntity.ok(coordinatorService.getPendingProjects());
    }

    @PutMapping("/projects/{id}/approve")
    public ResponseEntity<Project> approveProject(@PathVariable Long id) {
        return ResponseEntity.ok(coordinatorService.approveProject(id));
    }

    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(coordinatorService.createEvent(event));
    }

    // Partner Management Endpoints
    @GetMapping("/partners/pending")
    public ResponseEntity<List<PartnerRequest>> getPendingPartners() {
        return ResponseEntity.ok(coordinatorService.getPendingPartners());
    }

    @PutMapping("/partners/{id}/approve")
    public ResponseEntity<PartnerRequest> approvePartner(@PathVariable Long id) {
        return ResponseEntity.ok(coordinatorService.approvePartner(id));
    }

    @PutMapping("/partners/{id}/publish")
    public ResponseEntity<PartnerRequest> publishPartner(@PathVariable Long id) {
        return ResponseEntity.ok(coordinatorService.publishPartner(id));
    }

    @DeleteMapping("/partners/{id}")
    public ResponseEntity<Void> deletePartner(@PathVariable Long id) {
        coordinatorService.deletePartnerRequest(id);
        return ResponseEntity.ok().build();
    }

    // Expert Management Endpoints
    @GetMapping("/experts")
    public ResponseEntity<List<Expert>> getAllExperts() {
        return ResponseEntity.ok(expertService.getAllExperts());
    }

    @PostMapping("/experts")
    public ResponseEntity<Expert> addExpert(@RequestBody Expert expert) {
        return ResponseEntity.ok(expertService.saveExpert(expert));
    }

    @PutMapping("/experts/{id}")
    public ResponseEntity<Expert> updateExpert(@PathVariable Long id, @RequestBody Expert expert) {
        return ResponseEntity.ok(expertService.updateExpert(id, expert));
    }

    @DeleteMapping("/experts/{id}")
    public ResponseEntity<Void> deleteExpert(@PathVariable Long id) {
        expertService.deleteExpert(id);
        return ResponseEntity.ok().build();
    }
}
