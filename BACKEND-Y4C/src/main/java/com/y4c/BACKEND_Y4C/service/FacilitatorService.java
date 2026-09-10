package com.y4c.BACKEND_Y4C.service;

import com.y4c.BACKEND_Y4C.model.*;
import com.y4c.BACKEND_Y4C.repository.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FacilitatorService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final TimetableRepository timetableRepository;
    private final ProjectRepository projectRepository;
    private final SiteContentRepository siteContentRepository;
    private final RequestRepository requestRepository;

    public FacilitatorService(UserRepository userRepository, 
                            EventRepository eventRepository, 
                            TimetableRepository timetableRepository, 
                            ProjectRepository projectRepository, 
                            SiteContentRepository siteContentRepository, 
                            RequestRepository requestRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.timetableRepository = timetableRepository;
        this.projectRepository = projectRepository;
        this.siteContentRepository = siteContentRepository;
        this.requestRepository = requestRepository;
    }

    // CMS Management
    public List<SiteContent> getAllContent() {
        return siteContentRepository.findAll();
    }

    public SiteContent updateContent(String key, String value) {
        SiteContent content = new SiteContent(key, value);
        return siteContentRepository.save(content);
    }

    // Support Request Management
    public List<Request> getPendingRequests() {
        return requestRepository.findByStatus("PENDING");
    }

    public Request respondToRequest(Long requestId, String response) {
        Request req = requestRepository.findById(requestId).orElseThrow(() -> new RuntimeException("Request not found"));
        req.setFacilitatorResponse(response);
        req.setStatus("RESOLVED");
        return requestRepository.save(req);
    }

    // User Management
    public List<User> getPendingUsers() {
        return userRepository.findByStatus("PENDING");
    }

    public User admitUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setStatus("ACTIVE");
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // Event Management
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    // Timetable Management
    public Timetable createTimetableEntry(Timetable entry) {
        return timetableRepository.save(entry);
    }

    public List<Timetable> getAllTimetableEntries() {
        return timetableRepository.findAll();
    }

    // Dashboard Stats
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", userRepository.countByRole("USER") + userRepository.countByRole("MEMBER"));
        stats.put("activeProjects", projectRepository.count());
        stats.put("pendingProjects", projectRepository.countByStatus("PENDING"));
        stats.put("pendingUsers", userRepository.countByStatus("PENDING"));
        stats.put("pendingRequests", requestRepository.countByStatus("PENDING"));
        stats.put("efficiency", 94); // Mock efficiency for now
        
        // Mock growth data for the chart
        List<Map<String, Object>> growthData = List.of(
            Map.of("name", "Week 1", "students", 400, "projects", 240),
            Map.of("name", "Week 2", "students", 300, "projects", 139),
            Map.of("name", "Week 3", "students", 200, "projects", 980),
            Map.of("name", "Week 4", "students", 278, "projects", 390),
            Map.of("name", "Week 5", "students", 189, "projects", 480)
        );
        stats.put("growthData", growthData);

        // Project lifecycle data
        List<Map<String, Object>> lifecycleData = List.of(
            Map.of("name", "Completed", "value", projectRepository.countByStatus("APPROVED"), "color", "#10b981"),
            Map.of("name", "In Progress", "value", 300, "color", "#3b82f6"), // Mocking in progress
            Map.of("name", "Pending", "value", projectRepository.countByStatus("PENDING"), "color", "#f59e0b")
        );
        stats.put("lifecycleData", lifecycleData);

        return stats;
    }

    // Project Management
    public List<Project> getPendingProjects() {
        return projectRepository.findByStatus("PENDING");
    }

    public Project approveProject(Long projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        project.setStatus("APPROVED");
        Project savedProject = projectRepository.save(project);

        // Auto-assign to Hub Membership if not already a member
        if (project.getInnovatorEmail() != null) {
            String email = project.getInnovatorEmail();
            if (userRepository.findByEmail(email).isEmpty()) {
                User newUser = new User();
                newUser.setName(project.getInnovatorName());
                newUser.setEmail(email);
                newUser.setPassword("WelcomeY4C!"); // Default password, should be changed
                newUser.setRole("MEMBER");
                newUser.setStatus("ACTIVE");
                newUser.setUniversity(project.getInstitution());
                userRepository.save(newUser);
            } else {
                User existingUser = userRepository.findByEmail(email).get();
                if ("PENDING".equals(existingUser.getStatus())) {
                    existingUser.setStatus("ACTIVE");
                    userRepository.save(existingUser);
                }
            }
        }
        
        return savedProject;
    }
}
