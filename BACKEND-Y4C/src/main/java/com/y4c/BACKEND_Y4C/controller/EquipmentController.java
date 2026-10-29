package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.Equipment;
import com.y4c.BACKEND_Y4C.model.EquipmentBooking;
import com.y4c.BACKEND_Y4C.repository.EquipmentBookingRepository;
import com.y4c.BACKEND_Y4C.repository.EquipmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/equipment")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class EquipmentController {

    private final EquipmentRepository equipmentRepository;
    private final EquipmentBookingRepository bookingRepository;

    public EquipmentController(EquipmentRepository equipmentRepository, EquipmentBookingRepository bookingRepository) {
        this.equipmentRepository = equipmentRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public ResponseEntity<List<Equipment>> getAllEquipment() {
        return ResponseEntity.ok(equipmentRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Equipment> addEquipment(@RequestBody Equipment equipment) {
        return ResponseEntity.ok(equipmentRepository.save(equipment));
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<EquipmentBooking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }

    @PostMapping("/book")
    public ResponseEntity<EquipmentBooking> bookEquipment(@RequestBody EquipmentBooking booking) {
        booking.setStatus("PENDING");
        return ResponseEntity.ok(bookingRepository.save(booking));
    }

    @PutMapping("/bookings/{id}")
    public ResponseEntity<EquipmentBooking> updateBookingStatus(@PathVariable Long id, @RequestBody EquipmentBooking body) {
        return bookingRepository.findById(id).map(b -> {
            b.setStatus(body.getStatus());
            return ResponseEntity.ok(bookingRepository.save(b));
        }).orElse(ResponseEntity.notFound().build());
    }
}
