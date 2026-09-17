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
        System.out.println("----------------------- EMAIL SIMULATION -----------------------");
        System.out.println("TO: " + to);
        System.out.println("SUBJECT: Welcome to the Facilitation Team!");
        System.out.println("MESSAGE: Hello " + name + ",\n\nYour facilitator account has been admitted by a coordinator.\n" +
                "You can now access the Facilitator Dashboard and manage the Innovation Lab operations.\n\n" +
                "Best regards,\nY4C Innovation Lab Team");
        System.out.println("----------------------------------------------------------------");
    }

    public void sendMemberAdmissionNotification(String to, String name) {
        logger.info("Sending member admission notification to: {}", to);
        System.out.println("----------------------- EMAIL SIMULATION -----------------------");
        System.out.println("TO: " + to);
        System.out.println("SUBJECT: Welcome to the Innovation Lab!");
        System.out.println("MESSAGE: Hello " + name + ",\n\nCongratulations! Your membership request has been accepted by a facilitator.\n" +
                "You can now log in to the Y4C Innovation Lab Portal and access your personalized dashboard.\n\n" +
                "Best regards,\nY4C Innovation Lab Team");
        System.out.println("----------------------------------------------------------------");
    }

    public void sendProjectApprovalNotification(String to, String name, String projectTitle) {
        logger.info("Sending project approval notification to: {}", to);
        System.out.println("----------------------- EMAIL SIMULATION -----------------------");
        System.out.println("TO: " + to);
        System.out.println("SUBJECT: Y4C Lab - Project Approved: " + projectTitle);
        System.out.println("MESSAGE: Hello " + name + ",\n\nGreat news! Your project proposal for '" + projectTitle + "' has been approved by the Y4C Facilitation Team.\n" +
                "We are excited to see your ideas come to life. Check your dashboard for the next steps.\n\n" +
                "Best regards,\nY4C Innovation Lab Team");
        System.out.println("----------------------------------------------------------------");
    }

    public void sendRequestResponseNotification(String to, String name, String subject) {
        logger.info("Sending request response notification to: {}", to);
        System.out.println("----------------------- EMAIL SIMULATION -----------------------");
        System.out.println("TO: " + to);
        System.out.println("SUBJECT: Y4C Support - Response to: " + subject);
        System.out.println("MESSAGE: Hello " + name + ",\n\nA facilitator has responded to your support request regarding '" + subject + "'.\n" +
                "Please log in to your dashboard to view the full response.\n\n" +
                "Best regards,\nY4C Innovation Lab Team");
        System.out.println("----------------------------------------------------------------");
    }

    public void sendPasswordResetEmail(String to, String name, String resetCode) {
        logger.info("Sending password reset email to: {}", to);
        System.out.println("----------------------- EMAIL SIMULATION -----------------------");
        System.out.println("TO: " + to);
        System.out.println("SUBJECT: Y4C Innovation Lab - Password Reset Request");
        System.out.println("MESSAGE: Hello " + name + ",\n\nWe received a request to reset your password for your Y4C account.\n" +
                "Your password recovery code is: " + resetCode + "\n\n" +
                "If you did not request this, please ignore this email.\n\n" +
                "Best regards,\nY4C Innovation Lab Team");
        System.out.println("----------------------------------------------------------------");
    }
}
