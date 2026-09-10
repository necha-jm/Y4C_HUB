package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.SiteContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteContentRepository extends JpaRepository<SiteContent, String> {
}
