package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    List<EventRegistration> findByEventId(Long eventId);
    List<EventRegistration> findByEmail(String email);
}
