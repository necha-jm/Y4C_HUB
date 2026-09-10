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

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In production, use BCrypt
        user.setRole(request.getRole() != null ? request.getRole() : "USER");
        
        // If registering as a facilitator, set status to PENDING
        if ("FACILITATOR".equalsIgnoreCase(user.getRole())) {
            user.setStatus("PENDING");
        } else {
            user.setStatus("ACTIVE");
        }
        
        user.setIsStudent(request.getIsStudent());
        user.setRegistrationNumber(request.getRegistrationNumber());
        user.setProgram(request.getProgram());
        user.setYearOfStudy(request.getYearOfStudy());
        user.setUniversity(request.getUniversity());
        return userRepository.save(user);
    }

    public User login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return user;
    }
}
