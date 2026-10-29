package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, String> {
    Optional<Certificate> findByVerificationCode(String verificationCode);
}
