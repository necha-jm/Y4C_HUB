package com.y4c.BACKEND_Y4C.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "mentorship_bookings")
public class MentorshipBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String userName;
    private Long expertId;
    private String expertName;
    private String date;
    private String slot;
    private String topic;
    private String status = "CONFIRMED"; // CONFIRMED, COMPLETED, CANCELLED
    private String meetingLink;
    private LocalDateTime createdAt = LocalDateTime.now();

    public MentorshipBooking() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public Long getExpertId() { return expertId; }
    public void setExpertId(Long expertId) { this.expertId = expertId; }
    public String getExpertName() { return expertName; }
    public void setExpertName(String expertName) { this.expertName = expertName; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getSlot() { return slot; }
    public void setSlot(String slot) { this.slot = slot; }
    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getMeetingLink() { return meetingLink; }
    public void setMeetingLink(String meetingLink) { this.meetingLink = meetingLink; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
