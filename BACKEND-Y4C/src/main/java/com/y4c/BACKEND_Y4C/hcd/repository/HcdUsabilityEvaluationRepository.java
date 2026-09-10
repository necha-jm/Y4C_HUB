package com.y4c.BACKEND_Y4C.hcd.repository;

import com.y4c.BACKEND_Y4C.hcd.model.HcdUsabilityEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HcdUsabilityEvaluationRepository extends JpaRepository<HcdUsabilityEvaluation, Long> {
}
