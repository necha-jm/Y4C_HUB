package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.ContactInquiry;
import com.y4c.BACKEND_Y4C.repository.ContactInquiryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ContactController {

    private final ContactInquiryRepository inquiryRepository;

    public ContactController(ContactInquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    @PostMapping
    public ResponseEntity<ContactInquiry> submitInquiry(@RequestBody ContactInquiry inquiry) {
        inquiry.setStatus("NEW");
        return ResponseEntity.ok(inquiryRepository.save(inquiry));
    }

    @GetMapping
    public ResponseEntity<List<ContactInquiry>> getAllInquiries() {
        return ResponseEntity.ok(inquiryRepository.findAll());
    }

    @PutMapping("/{id}/reply")
    public ResponseEntity<ContactInquiry> replyToInquiry(@PathVariable Long id, @RequestBody ContactInquiry body) {
        return inquiryRepository.findById(id).map(inq -> {
            inq.setStatus("REPLIED");
            inq.setReplyText(body.getReplyText());
            return ResponseEntity.ok(inquiryRepository.save(inq));
        }).orElse(ResponseEntity.notFound().build());
    }
}
