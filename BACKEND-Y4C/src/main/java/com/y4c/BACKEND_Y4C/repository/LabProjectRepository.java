package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.LabProject;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LabProjectRepository extends JpaRepository<LabProject, Long> {
    Optional<LabProject> findByIsActiveTrue();
}
