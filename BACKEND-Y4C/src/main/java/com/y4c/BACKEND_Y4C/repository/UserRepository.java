package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByStatus(String status);
    long countByStatus(String status);
    long countByRole(String role);
}
