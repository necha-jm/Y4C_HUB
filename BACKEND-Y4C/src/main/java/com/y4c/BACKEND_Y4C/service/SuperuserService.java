package com.y4c.BACKEND_Y4C.service;

import com.y4c.BACKEND_Y4C.model.LabProject;
import com.y4c.BACKEND_Y4C.repository.LabProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class SuperuserService {

    private final LabProjectRepository projectRepository;

    public SuperuserService(LabProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<LabProject> getAllProjects() {
        return projectRepository.findAll();
    }

    @Transactional
    public LabProject createProject(LabProject project) {
        if (project.isActive()) {
            projectRepository.findAll().forEach(p -> {
                p.setActive(false);
                projectRepository.save(p);
            });
        }
        return projectRepository.save(project);
    }

    @Transactional
    public LabProject activateProject(Long id) {
        projectRepository.findAll().forEach(p -> {
            p.setActive(p.getId().equals(id));
            projectRepository.save(p);
        });
        return projectRepository.findById(id).orElseThrow();
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
    
    public LabProject updateProject(Long id, LabProject projectDetails) {
        LabProject project = projectRepository.findById(id).orElseThrow();
        project.setName(projectDetails.getName());
        project.setTitle(projectDetails.getTitle());
        project.setSubtitle(projectDetails.getSubtitle());
        project.setPrimaryColor(projectDetails.getPrimaryColor());
        project.setSecondaryColor(projectDetails.getSecondaryColor());
        project.setAccentColor(projectDetails.getAccentColor());
        project.setLogoUrl(projectDetails.getLogoUrl());
        project.setHeroImageUrl(projectDetails.getHeroImageUrl());
        return projectRepository.save(project);
    }
}
