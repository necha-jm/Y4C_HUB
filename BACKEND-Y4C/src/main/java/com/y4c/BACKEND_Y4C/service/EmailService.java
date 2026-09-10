package com.y4c.BACKEND_Y4C.service;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    public void sendAdmissionNotification(String to, String name) {
        // In a real application, you would use JavaMailSender here
        logger.info("Sending admission notification to: {} for user: {}", to, name);
        System.out.println("--------------------------------------------------");
        System.out.println("TO: " + to);
        System.out.println("SUBJECT: Welcome to the Facilitation Team!");
        System.out.println("MESSAGE: Hello " + name + ",\nYour facilitator account has been admitted by a coordinator. You can now access the Facilitator Dashboard.");
        System.out.println("--------------------------------------------------");
    }
}
