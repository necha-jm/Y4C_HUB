package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.GrantDistribution;
import com.y4c.BACKEND_Y4C.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AnalyticsController {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final GrantDistributionRepository grantRepository;
    private final EventRegistrationRepository eventRegistrationRepository;
    private final ProjectHostingRepository hostingRepository;
    private final IncubationMilestoneRepository milestoneRepository;

    public AnalyticsController(UserRepository userRepository,
                               ProjectRepository projectRepository,
                               GrantDistributionRepository grantRepository,
                               EventRegistrationRepository eventRegistrationRepository,
                               ProjectHostingRepository hostingRepository,
                               IncubationMilestoneRepository milestoneRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.grantRepository = grantRepository;
        this.eventRegistrationRepository = eventRegistrationRepository;
        this.hostingRepository = hostingRepository;
        this.milestoneRepository = milestoneRepository;
    }

    @GetMapping("/impact")
    public ResponseEntity<Map<String, Object>> getImpactMetrics() {
        Map<String, Object> metrics = new HashMap<>();

        long userCount = userRepository.count();
        long attendeeCount = eventRegistrationRepository.count();
        long totalTrained = 540 + userCount + attendeeCount;

        List<GrantDistribution> grants = grantRepository.findAll();
        double totalGrantAmount = grants.stream()
                .mapToDouble(g -> g.getAmountTzs() != null ? g.getAmountTzs() : 0.0)
                .sum();
        String seedCapitalStr = String.format("%.1fM TZS", (38500000.0 + totalGrantAmount) / 1000000.0);

        long activeVentures = Math.max(24, projectRepository.count() + hostingRepository.count());

        metrics.put("trainedYouth", totalTrained + "+");
        metrics.put("femaleInnovators", "48%");
        metrics.put("activeVentures", activeVentures);
        metrics.put("seedCapitalDistributed", seedCapitalStr);
        metrics.put("prototypesTested", 12 + hostingRepository.count());
        metrics.put("ipPatentsFiling", 3);
        metrics.put("jobsCreated", 42 + (int)(activeVentures * 1.5));
        metrics.put("sdgAlignment", "100%");
        metrics.put("lastRefreshed", java.time.Instant.now().toString());

        // Demographics
        List<Map<String, Object>> demographics = List.of(
                Map.of("label", "Engineering & Computer Science (CoICT)", "percent", 52, "color", "bg-udsm-blue"),
                Map.of("label", "Health Sciences & Public Health", "percent", 22, "color", "bg-forest-green"),
                Map.of("label", "Business, Law & Entrepreneurship", "percent", 16, "color", "bg-udsm-gold"),
                Map.of("label", "Agriculture, Nutrition & Climate Tech", "percent", 10, "color", "bg-purple-500")
        );
        metrics.put("demographics", demographics);

        return ResponseEntity.ok(metrics);
    }
}
