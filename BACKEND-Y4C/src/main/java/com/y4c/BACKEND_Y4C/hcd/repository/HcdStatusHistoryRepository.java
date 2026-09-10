package com.y4c.BACKEND_Y4C.hcd.repository;

import com.y4c.BACKEND_Y4C.hcd.model.HcdStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HcdStatusHistoryRepository extends JpaRepository<HcdStatusHistory, Long> {
    List<HcdStatusHistory> findByFeedbackId(Long feedbackId);
}
