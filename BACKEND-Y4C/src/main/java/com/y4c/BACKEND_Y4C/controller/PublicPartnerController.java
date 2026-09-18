package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.PartnerRequest;
import com.y4c.BACKEND_Y4C.service.CoordinatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/public/partners")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class PublicPartnerController {

    private final CoordinatorService coordinatorService;

    public PublicPartnerController(CoordinatorService coordinatorService) {
        this.coordinatorService = coordinatorService;
    }

    @PostMapping("/register")
    public ResponseEntity<PartnerRequest> registerPartner(@RequestBody PartnerRequest request) {
        return ResponseEntity.ok(coordinatorService.submitPartnerRequest(request));
    }

    @GetMapping("/published")
    public ResponseEntity<List<PartnerRequest>> getPublishedPartners() {
        return ResponseEntity.ok(coordinatorService.getPublishedPartners());
    }
}
