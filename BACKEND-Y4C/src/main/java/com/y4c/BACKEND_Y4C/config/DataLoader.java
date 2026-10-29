package com.y4c.BACKEND_Y4C.config;

import com.y4c.BACKEND_Y4C.model.*;
import com.y4c.BACKEND_Y4C.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final EquipmentRepository equipmentRepository;
    private final GrantDistributionRepository grantRepository;
    private final CertificateRepository certificateRepository;

    public DataLoader(UserRepository userRepository,
                      EquipmentRepository equipmentRepository,
                      GrantDistributionRepository grantRepository,
                      CertificateRepository certificateRepository) {
        this.userRepository = userRepository;
        this.equipmentRepository = equipmentRepository;
        this.grantRepository = grantRepository;
        this.certificateRepository = certificateRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Initialize Superuser
        if (userRepository.findByEmail("admin@y4c.com").isEmpty()) {
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail("admin@y4c.com");
            admin.setPassword("password123");
            admin.setRole("superuser");
            admin.setStatus("ACTIVE");
            userRepository.save(admin);
        }

        // Initialize Facilitator
        if (userRepository.findByEmail("facilitator@y4c.com").isEmpty()) {
            User facilitator = new User();
            facilitator.setName("Lead Facilitator");
            facilitator.setEmail("facilitator@y4c.com");
            facilitator.setPassword("password123");
            facilitator.setRole("facilitator");
            facilitator.setStatus("ACTIVE");
            userRepository.save(facilitator);
        }

        // Initialize Coordinator
        if (userRepository.findByEmail("coordinator@y4c.com").isEmpty()) {
            User coordinator = new User();
            coordinator.setName("Innovation Coordinator");
            coordinator.setEmail("coordinator@y4c.com");
            coordinator.setPassword("password123");
            coordinator.setRole("coordinator");
            coordinator.setStatus("ACTIVE");
            userRepository.save(coordinator);
        }

        // Initialize Normal Member
        if (userRepository.findByEmail("member@y4c.com").isEmpty()) {
            User member = new User();
            member.setName("Baraka Mwangi");
            member.setEmail("member@y4c.com");
            member.setPassword("password123");
            member.setRole("member");
            member.setStatus("ACTIVE");
            member.setUniversity("University of Dar es Salaam");
            member.setProgram("BSc Computer Science");
            member.setYearOfStudy("3rd Year");
            userRepository.save(member);
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

        // Seed Equipment
        if (equipmentRepository.count() == 0) {
            Equipment eq1 = new Equipment();
            eq1.setName("Ultimaker S5 Dual 3D Printer");
            eq1.setCategory("Fabrication");
            eq1.setLocation("Hardware Lab - Bay 1");
            eq1.setTotalQuantity(2);
            eq1.setAvailableQuantity(1);
            eq1.setStatus("AVAILABLE");
            eq1.setSpecs("PLA, ABS, Nylon | Max volume: 330 x 240 x 300 mm");
            equipmentRepository.save(eq1);

            Equipment eq2 = new Equipment();
            eq2.setName("Meta Quest 3 VR Development Kit");
            eq2.setCategory("AR/VR & Immersive");
            eq2.setLocation("XR Studio");
            eq2.setTotalQuantity(4);
            eq2.setAvailableQuantity(3);
            eq2.setStatus("AVAILABLE");
            eq2.setSpecs("Snapdragon XR2 Gen 2, 512GB, Mixed Reality");
            equipmentRepository.save(eq2);
        }
    }
}
