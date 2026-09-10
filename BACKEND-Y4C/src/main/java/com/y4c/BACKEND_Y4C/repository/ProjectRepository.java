package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStatus(String status);
    long countByStatus(String status);
}
