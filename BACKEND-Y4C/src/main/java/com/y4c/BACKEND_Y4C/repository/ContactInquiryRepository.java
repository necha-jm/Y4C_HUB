package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.ContactInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContactInquiryRepository extends JpaRepository<ContactInquiry, Long> {
    List<ContactInquiry> findByStatus(String status);
}
