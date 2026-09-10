package com.y4c.BACKEND_Y4C.hcd.service;

import com.y4c.BACKEND_Y4C.hcd.model.*;
import com.y4c.BACKEND_Y4C.hcd.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class HcdService {

    private final HcdFeedbackRepository feedbackRepository;
    private final HcdUserResearchRepository userResearchRepository;
    private final HcdUsabilityEvaluationRepository usabilityEvaluationRepository;
    private final HcdStatusHistoryRepository statusHistoryRepository;
    private final HcdInsightRepository insightRepository;
    private final HcdUserValidationRepository userValidationRepository;

    public HcdService(HcdFeedbackRepository feedbackRepository,
                      HcdUserResearchRepository userResearchRepository,
                      HcdUsabilityEvaluationRepository usabilityEvaluationRepository,
                      HcdStatusHistoryRepository statusHistoryRepository,
                      HcdInsightRepository insightRepository,
                      HcdUserValidationRepository userValidationRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userResearchRepository = userResearchRepository;
        this.usabilityEvaluationRepository = usabilityEvaluationRepository;
        this.statusHistoryRepository = statusHistoryRepository;
        this.insightRepository = insightRepository;
        this.userValidationRepository = userValidationRepository;
    }

    // Feedback Management
    @Transactional
    public HcdFeedback submitFeedback(HcdFeedback feedback) {
        feedback.setCreatedAt(LocalDateTime.now());
        feedback.setStatus("NEW");
        HcdFeedback saved = feedbackRepository.save(feedback);
        
        recordStatusChange(saved.getId(), null, "NEW", feedback.getUserId());
        return saved;
    }

    @Transactional
    public HcdFeedback updateFeedbackStatus(Long id, String newStatus, Long userId) {
        HcdFeedback feedback = feedbackRepository.findById(id).orElseThrow();
        String oldStatus = feedback.getStatus();
        feedback.setStatus(newStatus);
        
        if ("CLOSED".equals(newStatus)) {
            feedback.setResolutionDate(LocalDateTime.now());
        }
        
        HcdFeedback saved = feedbackRepository.save(feedback);
        recordStatusChange(id, oldStatus, newStatus, userId);
        return saved;
    }

    private void recordStatusChange(Long feedbackId, String oldStatus, String newStatus, Long userId) {
        HcdStatusHistory history = new HcdStatusHistory();
        history.setFeedbackId(feedbackId);
        history.setOldStatus(oldStatus);
        history.setNewStatus(newStatus);
        history.setChangedBy(userId);
        history.setChangedAt(LocalDateTime.now());
        statusHistoryRepository.save(history);
    }

    // User Research
    public HcdUserResearch saveUserResearch(HcdUserResearch research) {
        return userResearchRepository.save(research);
    }

    public List<HcdUserResearch> getAllUserResearch() {
        return userResearchRepository.findAll();
    }

    // Usability Evaluation
    public HcdUsabilityEvaluation submitEvaluation(HcdUsabilityEvaluation evaluation) {
        evaluation.setCreatedAt(LocalDateTime.now());
        return usabilityEvaluationRepository.save(evaluation);
    }

    // Insights and Analytics
    public void generateInsights() {
        // Simple logic to detect recurring problems in modules
        List<HcdFeedback> allFeedback = feedbackRepository.findAll();
        Map<String, List<HcdFeedback>> byModule = allFeedback.stream()
                .collect(Collectors.groupingBy(f -> f.getPageModule() != null ? f.getPageModule() : "unknown"));

        byModule.forEach((module, feedbacks) -> {
            if (feedbacks.size() >= 5) {
                HcdInsight insight = new HcdInsight();
                insight.setType("RECURRING_PROBLEM");
                insight.setAffectedModule(module);
                insight.setFrequency(feedbacks.size());
                insight.setPattern("High frequency of feedback in " + module);
                insight.setImpactScore(feedbacks.size() * 1.5);
                insight.setGeneratedAt(LocalDateTime.now());
                insightRepository.save(insight);
            }
        });
    }

    public List<HcdInsight> getLatestInsights() {
        return insightRepository.findAll();
    }

    // User Validation
    public HcdUserValidation submitValidation(HcdUserValidation validation) {
        validation.setValidatedAt(LocalDateTime.now());
        return userValidationRepository.save(validation);
    }

    // Dashboards Stats
    public Map<String, Object> getHcdStats() {
        long totalFeedback = feedbackRepository.count();
        long openIssues = feedbackRepository.findByStatus("NEW").size() + feedbackRepository.findByStatus("REVIEWING").size();
        
        return Map.of(
            "totalFeedback", totalFeedback,
            "openIssues", openIssues,
            "resolvedIssues", feedbackRepository.findByStatus("CLOSED").size()
        );
    }
}
