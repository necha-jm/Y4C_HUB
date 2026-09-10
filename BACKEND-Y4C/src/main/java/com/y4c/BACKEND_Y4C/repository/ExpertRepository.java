package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.Expert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExpertRepository extends JpaRepository<Expert, Long> {
    List<Expert> findAllByOrderByDisplayOrderAsc();
    List<Expert> findByParentIdOrderByDisplayOrderAsc(Long parentId);
}
