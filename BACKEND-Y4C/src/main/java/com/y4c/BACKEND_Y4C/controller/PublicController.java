package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.Event;
import com.y4c.BACKEND_Y4C.model.Expert;
import com.y4c.BACKEND_Y4C.model.SiteContent;
import com.y4c.BACKEND_Y4C.repository.EventRepository;
import com.y4c.BACKEND_Y4C.repository.ExpertRepository;
import com.y4c.BACKEND_Y4C.repository.SiteContentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PublicController {

    private final SiteContentRepository siteContentRepository;
    private final EventRepository eventRepository;
    private final ExpertRepository expertRepository;

    public PublicController(SiteContentRepository siteContentRepository, EventRepository eventRepository, ExpertRepository expertRepository) {
        this.siteContentRepository = siteContentRepository;
        this.eventRepository = eventRepository;
        this.expertRepository = expertRepository;
    }

    @GetMapping("/content")
    public ResponseEntity<List<SiteContent>> getSiteContent() {
        return ResponseEntity.ok(siteContentRepository.findAll());
    }

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getActiveEvents() {
        return ResponseEntity.ok(eventRepository.findByIsPublishedTrueAndExpiryDateAfter(LocalDateTime.now()));
    }

    @GetMapping("/experts")
    public ResponseEntity<List<Expert>> getAllExperts() {
        return ResponseEntity.ok(expertRepository.findAllByOrderByDisplayOrderAsc());
    }
}
