package com.y4c.BACKEND_Y4C.hcd.controller;

import com.y4c.BACKEND_Y4C.hcd.model.HcdFeedback;
import com.y4c.BACKEND_Y4C.hcd.model.HcdUsabilityEvaluation;
import com.y4c.BACKEND_Y4C.hcd.model.HcdUserValidation;
import com.y4c.BACKEND_Y4C.hcd.service.HcdService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hcd/user")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class HcdUserController {

    private final HcdService hcdService;

    public HcdUserController(HcdService hcdService) {
        this.hcdService = hcdService;
    }

    @PostMapping("/feedback")
    public ResponseEntity<HcdFeedback> submitFeedback(@RequestBody HcdFeedback feedback) {
        return ResponseEntity.ok(hcdService.submitFeedback(feedback));
    }

    @PostMapping("/evaluate")
    public ResponseEntity<HcdUsabilityEvaluation> submitEvaluation(@RequestBody HcdUsabilityEvaluation evaluation) {
        return ResponseEntity.ok(hcdService.submitEvaluation(evaluation));
    }

    @PostMapping("/validate")
    public ResponseEntity<HcdUserValidation> submitValidation(@RequestBody HcdUserValidation validation) {
        return ResponseEntity.ok(hcdService.submitValidation(validation));
    }
}
