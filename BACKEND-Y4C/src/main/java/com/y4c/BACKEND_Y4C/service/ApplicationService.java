package com.y4c.BACKEND_Y4C.service;

import com.y4c.BACKEND_Y4C.model.Application;
import com.y4c.BACKEND_Y4C.repository.ApplicationRepository;
import com.y4c.BACKEND_Y4C.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public ApplicationService(ApplicationRepository applicationRepository, UserRepository userRepository, EmailService emailService) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public Application submitApplication(Application application) {
        Application saved = applicationRepository.save(application);
        if (saved.getUserId() != null) {
            userRepository.findById(saved.getUserId()).ifPresent(user -> {
                if (user.getEmail() != null && !user.getEmail().trim().isEmpty()) {
                    emailService.sendApplicationSubmittedNotification(
                        user.getEmail(),
                        user.getName(),
                        saved.getProgramId() != null ? saved.getProgramId() : "Y4C Hub Program"
                    );
                }
            });
        }
        return saved;
    }

    public List<Application> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserId(userId);
    }
    
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
}
