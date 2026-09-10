package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUserId(Long userId);
}
