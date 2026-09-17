package com.y4c.BACKEND_Y4C.repository;

import com.y4c.BACKEND_Y4C.model.LabGallery;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LabGalleryRepository extends JpaRepository<LabGallery, Long> {
    List<LabGallery> findAllByOrderByUploadedAtDesc();
}
