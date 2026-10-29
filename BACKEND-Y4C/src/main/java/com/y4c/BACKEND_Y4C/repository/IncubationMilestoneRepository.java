package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.IncubationMilestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncubationMilestoneRepository extends JpaRepository<IncubationMilestone, Long> {
}
