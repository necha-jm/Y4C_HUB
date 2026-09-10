package com.y4c.BACKEND_Y4C.service;

import com.y4c.BACKEND_Y4C.model.Expert;
import com.y4c.BACKEND_Y4C.repository.ExpertRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ExpertService {
    private final ExpertRepository expertRepository;

    public ExpertService(ExpertRepository expertRepository) {
        this.expertRepository = expertRepository;
    }

    public List<Expert> getAllExperts() {
        return expertRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Expert saveExpert(Expert expert) {
        return expertRepository.save(expert);
    }

    public void deleteExpert(Long id) {
        expertRepository.deleteById(id);
    }

    public Expert updateExpert(Long id, Expert expertDetails) {
        Expert expert = expertRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expert not found"));
        expert.setName(expertDetails.getName());
        expert.setTitle(expertDetails.getTitle());
        expert.setBio(expertDetails.getBio());
        expert.setProfilePicture(expertDetails.getProfilePicture());
        expert.setDisplayOrder(expertDetails.getDisplayOrder());
        expert.setParentId(expertDetails.getParentId());
        return expertRepository.save(expert);
    }
}
