package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.User;
import com.y4c.BACKEND_Y4C.service.AuthService;
import com.y4c.BACKEND_Y4C.dto.LoginRequest;
import com.y4c.BACKEND_Y4C.dto.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            User user = authService.register(request);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = authService.login(request);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody String email) {
        try {
            // Remove extra quotes if sent as a raw string
            String cleanEmail = email.replace("\"", "");
            authService.forgotPassword(cleanEmail);
            return ResponseEntity.ok().body("{\"message\": \"Reset code sent to your email\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
