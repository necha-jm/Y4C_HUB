package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.CoFounderPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoFounderPostRepository extends JpaRepository<CoFounderPost, Long> {
}
