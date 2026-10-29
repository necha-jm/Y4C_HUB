package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.MentorshipBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MentorshipBookingRepository extends JpaRepository<MentorshipBooking, Long> {
    List<MentorshipBooking> findByUserId(Long userId);
    List<MentorshipBooking> findByExpertId(Long expertId);
}
