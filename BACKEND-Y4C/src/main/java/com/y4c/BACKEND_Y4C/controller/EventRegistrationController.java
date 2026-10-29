package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.EventRegistration;
import com.y4c.BACKEND_Y4C.repository.EventRegistrationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class EventRegistrationController {

    private final EventRegistrationRepository registrationRepository;

    public EventRegistrationController(EventRegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<EventRegistration> register(@RequestBody EventRegistration reg) {
        if (reg.getTicketId() == null || reg.getTicketId().isEmpty()) {
            reg.setTicketId("Y4C-TKT-" + (1000 + new Random().nextInt(9000)));
        }
        EventRegistration saved = registrationRepository.save(reg);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/attendees")
    public ResponseEntity<List<EventRegistration>> getAttendees() {
        return ResponseEntity.ok(registrationRepository.findAll());
    }

    @PutMapping("/checkin/{id}")
    public ResponseEntity<EventRegistration> checkIn(@PathVariable Long id) {
        return registrationRepository.findById(id).map(reg -> {
            reg.setCheckedIn(true);
            return ResponseEntity.ok(registrationRepository.save(reg));
        }).orElse(ResponseEntity.notFound().build());
    }
}
