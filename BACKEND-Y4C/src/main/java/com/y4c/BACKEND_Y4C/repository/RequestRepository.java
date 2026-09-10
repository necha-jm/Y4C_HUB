package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByUserId(Long userId);
    List<Request> findByStatus(String status);
    long countByStatus(String status);
}
