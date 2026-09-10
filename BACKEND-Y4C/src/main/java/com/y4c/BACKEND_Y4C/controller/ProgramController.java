package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.Program;
import com.y4c.BACKEND_Y4C.service.ProgramService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping
    public List<Program> getAllPrograms() {
        return programService.getAllPrograms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Program> getProgramById(@PathVariable String id) {
        return programService.getProgramById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Program createProgram(@RequestBody Program program) {
        return programService.saveProgram(program);
    }
}
