package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.Expert;
import com.y4c.BACKEND_Y4C.model.MentorshipBooking;
import com.y4c.BACKEND_Y4C.repository.ExpertRepository;
import com.y4c.BACKEND_Y4C.repository.MentorshipBookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/mentorship")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class MentorshipController {

    private final ExpertRepository expertRepository;
    private final MentorshipBookingRepository bookingRepository;

    public MentorshipController(ExpertRepository expertRepository, MentorshipBookingRepository bookingRepository) {
        this.expertRepository = expertRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/experts")
    public ResponseEntity<List<Expert>> getExperts() {
        return ResponseEntity.ok(expertRepository.findAll());
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<MentorshipBooking>> getBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }

    @PostMapping("/book")
    public ResponseEntity<MentorshipBooking> bookSession(@RequestBody MentorshipBooking booking) {
        booking.setStatus("CONFIRMED");
        if (booking.getMeetingLink() == null || booking.getMeetingLink().isEmpty()) {
            booking.setMeetingLink("https://meet.google.com/y4c-session-" + System.currentTimeMillis() % 10000);
        }
        return ResponseEntity.ok(bookingRepository.save(booking));
    }
}
