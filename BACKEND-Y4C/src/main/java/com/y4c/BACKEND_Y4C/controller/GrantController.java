package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.GrantDistribution;
import com.y4c.BACKEND_Y4C.repository.GrantDistributionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/grants")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class GrantController {

    private final GrantDistributionRepository grantRepository;

    public GrantController(GrantDistributionRepository grantRepository) {
        this.grantRepository = grantRepository;
    }

    @GetMapping
    public ResponseEntity<List<GrantDistribution>> getAllGrants() {
        return ResponseEntity.ok(grantRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<GrantDistribution> allocateGrant(@RequestBody GrantDistribution grant) {
        return ResponseEntity.ok(grantRepository.save(grant));
    }
}
