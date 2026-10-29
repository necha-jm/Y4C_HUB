package com.y4c.BACKEND_Y4C.service;

import com.y4c.BACKEND_Y4C.model.User;
import com.y4c.BACKEND_Y4C.repository.UserRepository;
import com.y4c.BACKEND_Y4C.dto.LoginRequest;
import com.y4c.BACKEND_Y4C.dto.RegisterRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public User register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In production, use BCrypt
        user.setRole(request.getRole() != null ? request.getRole() : "member");
        
        // All self-registrations are PENDING until approved by facilitator
        user.setStatus("PENDING");
        
        user.setIsStudent(request.getIsStudent());
        user.setRegistrationNumber(request.getRegistrationNumber());
        user.setProgram(request.getProgram());
        user.setYearOfStudy(request.getYearOfStudy());
        user.setUniversity(request.getUniversity());
        User savedUser = userRepository.save(user);

        // Send registration confirmation email to user's registered address
        emailService.sendRegistrationConfirmationNotification(savedUser.getEmail(), savedUser.getName());

        return savedUser;
    }

    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        if ("PENDING".equalsIgnoreCase(user.getStatus())) {
            throw new RuntimeException("Account pending approval. You will be notified via email once accepted.");
        }

        return user;
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User with this email not found"));
        
        // Generate a simple recovery code
        String recoveryCode = String.valueOf((int)(Math.random() * 900000) + 100000);
        
        // In a real app, you'd store this code in DB with expiry
        // For simulation, we just log it and send email
        emailService.sendPasswordResetEmail(user.getEmail(), user.getName(), recoveryCode);
    }
}
