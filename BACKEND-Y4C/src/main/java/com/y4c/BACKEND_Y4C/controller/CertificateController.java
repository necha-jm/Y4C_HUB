package com.y4c.BACKEND_Y4C.controller;

import com.y4c.BACKEND_Y4C.model.Certificate;
import com.y4c.BACKEND_Y4C.repository.CertificateRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CertificateController {

    private final CertificateRepository certificateRepository;

    public CertificateController(CertificateRepository certificateRepository) {
        this.certificateRepository = certificateRepository;
    }

    @GetMapping
    public ResponseEntity<List<Certificate>> getAllCertificates() {
        return ResponseEntity.ok(certificateRepository.findAll());
    }

    @PostMapping("/issue")
    public ResponseEntity<Certificate> issueCertificate(@RequestBody Certificate cert) {
        if (cert.getId() == null || cert.getId().isEmpty()) {
            cert.setId("Y4C-CERT-" + LocalDate.now().getYear() + "-" + (100 + new Random().nextInt(900)));
        }
        if (cert.getVerificationCode() == null || cert.getVerificationCode().isEmpty()) {
            cert.setVerificationCode("Y4C-VERIFY-" + (1000 + new Random().nextInt(9000)));
        }
        cert.setStatus("ISSUED");
        return ResponseEntity.ok(certificateRepository.save(cert));
    }

    @GetMapping("/verify/{code}")
    public ResponseEntity<Certificate> verifyCertificate(@PathVariable String code) {
        return certificateRepository.findByVerificationCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
