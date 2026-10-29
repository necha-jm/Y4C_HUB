package com.y4c.BACKEND_Y4C.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String message) {
        if (to == null || to.trim().isEmpty()) {
            logger.warn("Cannot send email: recipient address is null or empty");
            return;
        }

        logger.info("Attempting to send email notification to registered address: {}", to);
        System.out.println("----------------------- EMAIL NOTIFICATION TO REGISTERED USER -----------------------");
        System.out.println("TO: " + to);
        System.out.println("SUBJECT: " + subject);
        System.out.println("MESSAGE:\n" + message);
        System.out.println("-------------------------------------------------------------------------------------");

        if (mailSender != null) {
            try {
                SimpleMailMessage mailMessage = new SimpleMailMessage();
                mailMessage.setFrom("noreply@y4c.com");
                mailMessage.setTo(to);
                mailMessage.setSubject(subject);
                mailMessage.setText(message);
                mailSender.send(mailMessage);
                logger.info("Email successfully sent via SMTP to registered address: {}", to);
            } catch (Exception e) {
                logger.warn("SMTP email transmission to {} failed: {}. Console output recorded.", to, e.getMessage());
            }
        } else {
            logger.info("JavaMailSender bean not active or unconfigured. Console email simulation recorded.");
        }
    }

    public void sendRegistrationConfirmationNotification(String to, String name) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "Innovator";
        String subject = "Y4C Innovation Lab - Registration Received";
        String message = "Hello " + displayName + ",\n\n" +
                "Thank you for registering at the Y4C Innovation Lab Portal.\n" +
                "Your account request has been received and is currently under review by our facilitation team.\n" +
                "You will receive a confirmation email at this registered email address once your account is activated.\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }

    public void sendAdmissionNotification(String to, String name) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "Facilitator";
        String subject = "Welcome to the Facilitation Team - Y4C Innovation Lab";
        String message = "Hello " + displayName + ",\n\n" +
                "Your facilitator account has been admitted by an Innovation Coordinator.\n" +
                "You can now access the Facilitator Dashboard and manage Innovation Lab operations.\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }

    public void sendMemberAdmissionNotification(String to, String name) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "Member";
        String subject = "Welcome to the Innovation Lab - Account Activated!";
        String message = "Hello " + displayName + ",\n\n" +
                "Congratulations! Your membership request has been accepted by a facilitator.\n" +
                "You can now log in to the Y4C Innovation Lab Portal and access your personalized dashboard.\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }

    public void sendProjectSubmissionNotification(String to, String name, String projectTitle) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "Innovator";
        String title = (projectTitle != null && !projectTitle.trim().isEmpty()) ? projectTitle : "Your Project";
        String subject = "Y4C Lab - Project Proposal Submitted: " + title;
        String message = "Hello " + displayName + ",\n\n" +
                "Thank you for submitting your project proposal for '" + title + "'.\n" +
                "Our team is reviewing your proposal and will update you via your registered email as soon as a decision is made.\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }

    public void sendProjectApprovalNotification(String to, String name, String projectTitle) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "Innovator";
        String title = (projectTitle != null && !projectTitle.trim().isEmpty()) ? projectTitle : "Your Project";
        String subject = "Y4C Lab - Project Approved: " + title;
        String message = "Hello " + displayName + ",\n\n" +
                "Great news! Your project proposal for '" + title + "' has been approved by the Y4C Facilitation Team.\n" +
                "We are excited to see your ideas come to life. Log in to your dashboard to view the next steps.\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }

    public void sendProjectStatusNotification(String to, String name, String projectTitle, String status) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "Innovator";
        String title = (projectTitle != null && !projectTitle.trim().isEmpty()) ? projectTitle : "Your Project";
        String subject = "Y4C Lab - Project Status Updated: " + title;
        String message = "Hello " + displayName + ",\n\n" +
                "The status of your project proposal '" + title + "' has been updated to: " + status + ".\n" +
                "Please log in to your dashboard for further details.\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }

    public void sendRequestSubmittedNotification(String to, String name, String requestSubject) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "Member";
        String reqSub = (requestSubject != null && !requestSubject.trim().isEmpty()) ? requestSubject : "Support Request";
        String subject = "Y4C Support - Request Received: " + reqSub;
        String message = "Hello " + displayName + ",\n\n" +
                "We have received your support request regarding '" + reqSub + "'.\n" +
                "A facilitator will review your request and respond to you shortly at this registered email address.\n\n" +
                "Best regards,\n" +
                "Y4C Support Team";
        sendEmail(to, subject, message);
    }

    public void sendRequestResponseNotification(String to, String name, String requestSubject) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "Member";
        String reqSub = (requestSubject != null && !requestSubject.trim().isEmpty()) ? requestSubject : "Support Request";
        String subject = "Y4C Support - Response to: " + reqSub;
        String message = "Hello " + displayName + ",\n\n" +
                "A facilitator has responded to your support request regarding '" + reqSub + "'.\n" +
                "Please log in to your dashboard to view the full response.\n\n" +
                "Best regards,\n" +
                "Y4C Support Team";
        sendEmail(to, subject, message);
    }

    public void sendApplicationSubmittedNotification(String to, String name, String programTitle) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "Applicant";
        String progTitle = (programTitle != null && !programTitle.trim().isEmpty()) ? programTitle : "Program";
        String subject = "Y4C Hub - Application Received: " + progTitle;
        String message = "Hello " + displayName + ",\n\n" +
                "Your application for '" + progTitle + "' has been successfully submitted.\n" +
                "Our team will review your application and notify you through this registered email address.\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }

    public void sendPartnerRequestSubmissionNotification(String to, String institutionName) {
        String name = (institutionName != null && !institutionName.trim().isEmpty()) ? institutionName : "Partner";
        String subject = "Y4C Hub - Partnership Request Received";
        String message = "Hello " + name + ",\n\n" +
                "Thank you for reaching out to partner with Y4C Innovation Lab.\n" +
                "Your partnership application has been received and is being reviewed by our leadership team.\n" +
                "We will reach out to you via this registered email address shortly.\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }

    public void sendPartnerApprovalNotification(String to, String institutionName) {
        String name = (institutionName != null && !institutionName.trim().isEmpty()) ? institutionName : "Partner";
        String subject = "Y4C Hub - Partnership Proposal Approved!";
        String message = "Hello " + name + ",\n\n" +
                "We are delighted to inform you that your partnership request for '" + name + "' has been approved!\n" +
                "Our team will get in touch with you to finalize collaboration details.\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }

    public void sendPasswordResetEmail(String to, String name, String resetCode) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "User";
        String subject = "Y4C Innovation Lab - Password Reset Request";
        String message = "Hello " + displayName + ",\n\n" +
                "We received a request to reset your password for your Y4C account.\n" +
                "Your password recovery code is: " + resetCode + "\n\n" +
                "If you did not request this, please ignore this email.\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }

    public void sendGeneralNotification(String to, String name, String subject, String messageContent) {
        String displayName = (name != null && !name.trim().isEmpty()) ? name : "User";
        String message = "Hello " + displayName + ",\n\n" +
                messageContent + "\n\n" +
                "Best regards,\n" +
                "Y4C Innovation Lab Team";
        sendEmail(to, subject, message);
    }
}
