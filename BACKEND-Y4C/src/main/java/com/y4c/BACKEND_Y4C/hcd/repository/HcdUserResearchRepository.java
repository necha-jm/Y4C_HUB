package com.y4c.BACKEND_Y4C.hcd.repository;

import com.y4c.BACKEND_Y4C.hcd.model.HcdUserResearch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HcdUserResearchRepository extends JpaRepository<HcdUserResearch, Long> {
}
