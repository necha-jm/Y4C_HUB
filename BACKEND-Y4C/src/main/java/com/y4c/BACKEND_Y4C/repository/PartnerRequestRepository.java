package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.PartnerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PartnerRequestRepository extends JpaRepository<PartnerRequest, Long> {
    List<PartnerRequest> findByStatus(String status);
    List<PartnerRequest> findByIsPublishedTrue();
}
