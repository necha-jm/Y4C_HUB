package com.y4c.BACKEND_Y4C.hcd.repository;

import com.y4c.BACKEND_Y4C.hcd.model.HcdFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HcdFeedbackRepository extends JpaRepository<HcdFeedback, Long> {
    List<HcdFeedback> findByUserId(Long userId);
    List<HcdFeedback> findByStatus(String status);
    List<HcdFeedback> findByPageModule(String pageModule);
}
