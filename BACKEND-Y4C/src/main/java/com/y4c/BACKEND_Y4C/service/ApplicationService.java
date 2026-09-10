package com.y4c.BACKEND_Y4C.service;

import com.y4c.BACKEND_Y4C.model.Application;
import com.y4c.BACKEND_Y4C.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    public Application submitApplication(Application application) {
        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserId(userId);
    }
    
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
}
