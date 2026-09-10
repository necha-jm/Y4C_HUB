package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.Request;
import com.y4c.BACKEND_Y4C.repository.RequestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/member")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class MemberController {

    private final RequestRepository requestRepository;

    public MemberController(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @PostMapping("/requests")
    public ResponseEntity<Request> submitRequest(@RequestBody Request request) {
        request.setStatus("PENDING");
        return ResponseEntity.ok(requestRepository.save(request));
    }

    @GetMapping("/requests/{userId}")
    public ResponseEntity<List<Request>> getMyRequests(@PathVariable Long userId) {
        return ResponseEntity.ok(requestRepository.findByUserId(userId));
    }
}
