package com.y4c.BACKEND_Y4C.service;

import com.y4c.BACKEND_Y4C.model.*;
import com.y4c.BACKEND_Y4C.repository.*;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CoordinatorService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final TimetableRepository timetableRepository;
    private final ProjectRepository projectRepository;
    private final EventRepository eventRepository;
    private final PartnerRequestRepository partnerRequestRepository;

    public CoordinatorService(UserRepository userRepository, EmailService emailService, TimetableRepository timetableRepository, ProjectRepository projectRepository, EventRepository eventRepository, PartnerRequestRepository partnerRequestRepository) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.timetableRepository = timetableRepository;
        this.projectRepository = projectRepository;
        this.eventRepository = eventRepository;
        this.partnerRequestRepository = partnerRequestRepository;
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("activeMentees", userRepository.count()); // Simple count for now
        stats.put("coursesLed", 3);
        stats.put("avgRating", 4.9);
        stats.put("liveSessions", 2);
        return stats;
    }

    public List<Timetable> getUpcomingSchedule() {
        return timetableRepository.findAll();
    }
    
    public List<Map<String, Object>> getMenteeProgress() {
        // Mocking some data for now based on user count or names
        return userRepository.findAll().stream().limit(5).map(u -> {
            Map<String, Object> m = new HashMap<>();
            m.put("name", u.getName());
            m.put("prog", Math.floor(Math.random() * 40) + 60); // Random progress 60-100
            m.put("color", "bg-blue-400");
            return m;
        }).collect(Collectors.toList());
    }

    public List<User> getPendingFacilitators() {
        return userRepository.findByStatus("PENDING").stream()
                .filter(u -> "FACILITATOR".equalsIgnoreCase(u.getRole()))
                .collect(Collectors.toList());
    }

    public User admitFacilitator(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Facilitator not found"));
        
        user.setStatus("ACTIVE");
        User savedUser = userRepository.save(user);
        
        // Send notification
        emailService.sendAdmissionNotification(savedUser.getEmail(), savedUser.getName());
        
        return savedUser;
    }

    public User addFacilitator(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        user.setRole("FACILITATOR");
        user.setStatus("ACTIVE");
        User savedUser = userRepository.save(user);
        
        // Send notification
        emailService.sendAdmissionNotification(savedUser.getEmail(), savedUser.getName());
        
        return savedUser;
    }

    public void deleteFacilitator(Long userId) {
        userRepository.deleteById(userId);
    }

    public List<Project> getPendingProjects() {
        return projectRepository.findByStatus("PENDING");
    }

    public Project approveProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        
        project.setStatus("APPROVED");
        Project savedProject = projectRepository.save(project);

        // Notify innovator via email
        if (project.getInnovatorEmail() != null) {
            emailService.sendProjectApprovalNotification(project.getInnovatorEmail(), project.getInnovatorName(), project.getTitle());
        }

        // Auto-assign to Hub Membership if not already a member
        if (project.getInnovatorEmail() != null) {
            String email = project.getInnovatorEmail();
            if (userRepository.findByEmail(email).isEmpty()) {
                User newUser = new User();
                newUser.setName(project.getInnovatorName());
                newUser.setEmail(email);
                newUser.setPassword("WelcomeY4C!"); // Default password
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

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<PartnerRequest> getPendingPartners() {
        return partnerRequestRepository.findByStatus("PENDING");
    }

    public PartnerRequest approvePartner(Long partnerId) {
        PartnerRequest request = partnerRequestRepository.findById(partnerId)
                .orElseThrow(() -> new RuntimeException("Partner request not found"));
        request.setStatus("APPROVED");
        return partnerRequestRepository.save(request);
    }

    public PartnerRequest publishPartner(Long partnerId) {
        PartnerRequest request = partnerRequestRepository.findById(partnerId)
                .orElseThrow(() -> new RuntimeException("Partner request not found"));
        request.setStatus("APPROVED");
        request.setIsPublished(true);
        return partnerRequestRepository.save(request);
    }

    public List<PartnerRequest> getPublishedPartners() {
        return partnerRequestRepository.findByIsPublishedTrue();
    }

    public void deletePartnerRequest(Long partnerId) {
        partnerRequestRepository.deleteById(partnerId);
    }

    public PartnerRequest submitPartnerRequest(PartnerRequest request) {
        request.setStatus("PENDING");
        return partnerRequestRepository.save(request);
    }
}
