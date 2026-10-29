package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.CoFounderPost;
import com.y4c.BACKEND_Y4C.repository.CoFounderPostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cofounder")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CoFounderController {

    private final CoFounderPostRepository postRepository;

    public CoFounderController(CoFounderPostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping("/posts")
    public ResponseEntity<List<CoFounderPost>> getAllPosts() {
        return ResponseEntity.ok(postRepository.findAll());
    }

    @PostMapping("/posts")
    public ResponseEntity<CoFounderPost> createPost(@RequestBody CoFounderPost post) {
        return ResponseEntity.ok(postRepository.save(post));
    }
}
