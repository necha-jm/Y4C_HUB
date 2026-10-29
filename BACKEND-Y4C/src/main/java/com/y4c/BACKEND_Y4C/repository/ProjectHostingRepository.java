package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.ProjectHostingRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectHostingRepository extends JpaRepository<ProjectHostingRequest, Long> {
    List<ProjectHostingRequest> findByUserId(Long userId);
    List<ProjectHostingRequest> findByStatus(String status);
}
