package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.EquipmentBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EquipmentBookingRepository extends JpaRepository<EquipmentBooking, Long> {
    List<EquipmentBooking> findByUserId(Long userId);
    List<EquipmentBooking> findByStatus(String status);
}
