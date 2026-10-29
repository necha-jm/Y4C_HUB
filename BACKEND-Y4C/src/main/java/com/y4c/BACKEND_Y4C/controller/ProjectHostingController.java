package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.ProjectHostingRequest;
import com.y4c.BACKEND_Y4C.repository.ProjectHostingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/hosting")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProjectHostingController {

    private final ProjectHostingRepository hostingRepository;

    public ProjectHostingController(ProjectHostingRepository hostingRepository) {
        this.hostingRepository = hostingRepository;
    }

    // Student demands project hosting on server
    @PostMapping("/request")
    public ResponseEntity<ProjectHostingRequest> submitHostingRequest(@RequestBody ProjectHostingRequest req) {
        req.setStatus("PENDING_APPROVAL");
        req.setRequestedAt(LocalDateTime.now());
        ProjectHostingRequest saved = hostingRepository.save(req);
        return ResponseEntity.ok(saved);
    }

    // Coordinator views all student hosting requests
    @GetMapping("/requests")
    public ResponseEntity<List<ProjectHostingRequest>> getAllRequests() {
        return ResponseEntity.ok(hostingRepository.findAll());
    }

    // Student views their own hosting requests
    @GetMapping("/my-requests/{userId}")
    public ResponseEntity<List<ProjectHostingRequest>> getMyRequests(@PathVariable Long userId) {
        return ResponseEntity.ok(hostingRepository.findByUserId(userId));
    }

    // Coordinator accepts demand, provisions live server URL & access credentials
    @PutMapping("/requests/{id}/approve")
    public ResponseEntity<ProjectHostingRequest> approveAndProvision(@PathVariable Long id, @RequestBody ProjectHostingRequest body) {
        return hostingRepository.findById(id).map(req -> {
            req.setStatus("ACTIVE");
            String sub = req.getRequestedSubdomain() != null ? req.getRequestedSubdomain().toLowerCase() : "app-" + req.getId();
            req.setLiveUrl(body.getLiveUrl() != null && !body.getLiveUrl().isEmpty()
                ? body.getLiveUrl()
                : "https://" + sub + ".y4chub.udsm.ac.tz");
            req.setServerIp(body.getServerIp() != null && !body.getServerIp().isEmpty()
                ? body.getServerIp()
                : "196.216.240.42");
            req.setAllocatedPort(body.getAllocatedPort() != null ? body.getAllocatedPort() : (8000 + new Random().nextInt(1000)));
            req.setAccessCredentials(body.getAccessCredentials() != null && !body.getAccessCredentials().isEmpty()
                ? body.getAccessCredentials()
                : "ssh y4c_deploy@" + req.getServerIp() + " -i ~/.ssh/y4c_key.pem");
            req.setCoordinatorRemarks(body.getCoordinatorRemarks() != null
                ? body.getCoordinatorRemarks()
                : "Server container provisioned on UDSM Innovation Lab cluster. HTTPS certificate active.");
            req.setProvisionedAt(LocalDateTime.now());
            return ResponseEntity.ok(hostingRepository.save(req));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Coordinator rejects hosting demand
    @PutMapping("/requests/{id}/reject")
    public ResponseEntity<ProjectHostingRequest> rejectHostingRequest(@PathVariable Long id, @RequestBody ProjectHostingRequest body) {
        return hostingRepository.findById(id).map(req -> {
            req.setStatus("REJECTED");
            req.setCoordinatorRemarks(body.getCoordinatorRemarks() != null ? body.getCoordinatorRemarks() : "Hosting criteria not met.");
            return ResponseEntity.ok(hostingRepository.save(req));
        }).orElse(ResponseEntity.notFound().build());
    }
}
