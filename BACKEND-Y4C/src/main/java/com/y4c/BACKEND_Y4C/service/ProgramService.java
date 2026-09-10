package com.y4c.BACKEND_Y4C.service;

import com.y4c.BACKEND_Y4C.model.Program;
import com.y4c.BACKEND_Y4C.repository.ProgramRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramService {

    private final ProgramRepository programRepository;

    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public List<Program> getAllPrograms() {
        return programRepository.findAll();
    }

    public Optional<Program> getProgramById(String id) {
        return programRepository.findById(id);
    }
    
    public Program saveProgram(Program program) {
        return programRepository.save(program);
    }
}
