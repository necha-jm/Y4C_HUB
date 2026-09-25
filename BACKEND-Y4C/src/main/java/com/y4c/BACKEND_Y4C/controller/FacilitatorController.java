package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.*;
import com.y4c.BACKEND_Y4C.service.FacilitatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/facilitator")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class FacilitatorController {

    private final FacilitatorService facilitatorService;

    public FacilitatorController(FacilitatorService facilitatorService) {
        this.facilitatorService = facilitatorService;
    }

    @GetMapping("/users/pending")
    public ResponseEntity<List<User>> getPendingUsers() {
        return ResponseEntity.ok(facilitatorService.getPendingUsers());
    }

    @GetMapping("/users/active")
    public ResponseEntity<List<User>> getActiveUsers() {
        return ResponseEntity.ok(facilitatorService.getActiveUsers());
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(facilitatorService.getAllUsers());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(facilitatorService.getDashboardStats());
    }

    @PutMapping("/users/{id}/admit")
    public ResponseEntity<?> admitUser(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(facilitatorService.admitUser(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            return ResponseEntity.ok(facilitatorService.createActiveUser(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            facilitatorService.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(facilitatorService.createEvent(event));
    }

    @PostMapping("/timetables")
    public ResponseEntity<Timetable> createTimetable(@RequestBody Timetable timetable) {
        return ResponseEntity.ok(facilitatorService.createTimetableEntry(timetable));
    }

    @GetMapping("/timetables")
    public ResponseEntity<List<Timetable>> getTimetables() {
        return ResponseEntity.ok(facilitatorService.getAllTimetableEntries());
    }

    @GetMapping("/projects/pending")
    public ResponseEntity<List<Project>> getPendingProjects() {
        return ResponseEntity.ok(facilitatorService.getPendingProjects());
    }

    @PutMapping("/projects/{id}/approve")
    public ResponseEntity<Project> approveProject(@PathVariable Long id) {
        return ResponseEntity.ok(facilitatorService.approveProject(id));
    }

    // CMS Endpoints
    @GetMapping("/content")
    public ResponseEntity<List<SiteContent>> getAllContent() {
        return ResponseEntity.ok(facilitatorService.getAllContent());
    }

    @PutMapping("/content/{key}")
    public ResponseEntity<SiteContent> updateContent(@PathVariable String key, @RequestBody String value) {
        return ResponseEntity.ok(facilitatorService.updateContent(key, value));
    }

    // Request Endpoints
    @GetMapping("/requests/pending")
    public ResponseEntity<List<Request>> getPendingRequests() {
        return ResponseEntity.ok(facilitatorService.getPendingRequests());
    }

    @PutMapping("/requests/{id}/respond")
    public ResponseEntity<Request> respondToRequest(@PathVariable Long id, @RequestBody String response) {
        return ResponseEntity.ok(facilitatorService.respondToRequest(id, response));
    }

    // Gallery Management
    @DeleteMapping("/gallery/{id}")
    public ResponseEntity<Void> deleteGalleryItem(@PathVariable Long id) {
        facilitatorService.deleteGalleryItem(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/gallery/{id}")
    public ResponseEntity<LabGallery> updateGalleryItem(@PathVariable Long id, @RequestBody LabGallery item) {
        return ResponseEntity.ok(facilitatorService.updateGalleryItem(id, item));
    }
}
