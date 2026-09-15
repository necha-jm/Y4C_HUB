package com.y4c.BACKEND_Y4C.config;

import com.y4c.BACKEND_Y4C.model.User;
import com.y4c.BACKEND_Y4C.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataLoader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize Superuser
        if (userRepository.findByEmail("admin@y4c.com").isEmpty()) {
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail("admin@y4c.com");
            admin.setPassword("admin123");
            admin.setRole("superuser");
            admin.setStatus("ACTIVE");
            userRepository.save(admin);
        }

        // Initialize Facilitator
        if (userRepository.findByEmail("facilitator@y4c.com").isEmpty()) {
            User facilitator = new User();
            facilitator.setName("Lead Facilitator");
            facilitator.setEmail("facilitator@y4c.com");
            facilitator.setPassword("facilitator123");
            facilitator.setRole("facilitator");
            facilitator.setStatus("ACTIVE");
            userRepository.save(facilitator);
        }

        // Initialize Coordinator
        if (userRepository.findByEmail("coordinator@y4c.com").isEmpty()) {
            User coordinator = new User();
            coordinator.setName("Innovation Coordinator");
            coordinator.setEmail("coordinator@y4c.com");
            coordinator.setPassword("coordinator123");
            coordinator.setRole("coordinator");
            coordinator.setStatus("ACTIVE");
            userRepository.save(coordinator);
        }

        // Initialize Guest for testing
        if (userRepository.findByEmail("guest@y4c.com").isEmpty()) {
            User guest = new User();
            guest.setName("Guest User");
            guest.setEmail("guest@y4c.com");
            guest.setPassword("password123");
            guest.setRole("guest");
            guest.setStatus("ACTIVE");
            userRepository.save(guest);
        }
    }
}
