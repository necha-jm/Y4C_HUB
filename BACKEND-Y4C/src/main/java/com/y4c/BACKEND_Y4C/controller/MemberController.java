package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.LabGallery;
import com.y4c.BACKEND_Y4C.model.Request;
import com.y4c.BACKEND_Y4C.repository.LabGalleryRepository;
import com.y4c.BACKEND_Y4C.repository.RequestRepository;
import com.y4c.BACKEND_Y4C.repository.UserRepository;
import com.y4c.BACKEND_Y4C.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/member")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class MemberController {

    private final RequestRepository requestRepository;
    private final LabGalleryRepository galleryRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public MemberController(RequestRepository requestRepository, LabGalleryRepository galleryRepository, UserRepository userRepository, EmailService emailService) {
        this.requestRepository = requestRepository;
        this.galleryRepository = galleryRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @PostMapping("/requests")
    public ResponseEntity<Request> submitRequest(@RequestBody Request request) {
        request.setStatus("PENDING");
        Request saved = requestRepository.save(request);
        if (saved.getUserId() != null) {
            userRepository.findById(saved.getUserId()).ifPresent(user -> {
                if (user.getEmail() != null && !user.getEmail().trim().isEmpty()) {
                    emailService.sendRequestSubmittedNotification(user.getEmail(), user.getName(), saved.getSubject());
                }
            });
        }
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/requests/{userId}")
    public ResponseEntity<List<Request>> getMyRequests(@PathVariable Long userId) {
        return ResponseEntity.ok(requestRepository.findByUserId(userId));
    }

    // Lab Gallery Endpoints
    @GetMapping("/gallery")
    public ResponseEntity<List<LabGallery>> getGallery() {
        return ResponseEntity.ok(galleryRepository.findAllByOrderByUploadedAtDesc());
    }

    @PostMapping("/gallery")
    public ResponseEntity<LabGallery> uploadToGallery(@RequestBody LabGallery item) {
        return ResponseEntity.ok(galleryRepository.save(item));
    }
}
