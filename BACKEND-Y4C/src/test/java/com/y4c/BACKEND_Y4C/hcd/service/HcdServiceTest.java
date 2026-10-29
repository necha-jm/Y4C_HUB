package com.y4c.BACKEND_Y4C.hcd.service;

import com.y4c.BACKEND_Y4C.hcd.model.HcdFeedback;
import com.y4c.BACKEND_Y4C.hcd.model.HcdStatusHistory;
import com.y4c.BACKEND_Y4C.hcd.repository.*;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class HcdServiceTest {

    @Mock
    private HcdFeedbackRepository feedbackRepository;

    @Mock
    private HcdUserResearchRepository userResearchRepository;

    @Mock
    private HcdUsabilityEvaluationRepository usabilityEvaluationRepository;

    @Mock
    private HcdStatusHistoryRepository statusHistoryRepository;

    @Mock
    private HcdInsightRepository insightRepository;

    @Mock
    private HcdUserValidationRepository userValidationRepository;

    @InjectMocks
    private HcdService hcdService;

    @Test
    public void testSubmitFeedback() {
        HcdFeedback feedback = new HcdFeedback();
        feedback.setTitle("Test Issue");
        feedback.setUserId(1L);

        when(feedbackRepository.save(any(HcdFeedback.class))).thenReturn(feedback);
        when(statusHistoryRepository.save(any(HcdStatusHistory.class))).thenReturn(new HcdStatusHistory());

        HcdFeedback saved = hcdService.submitFeedback(feedback);

        assertNotNull(saved);
        assertEquals("Test Issue", saved.getTitle());
        verify(feedbackRepository, times(1)).save(any(HcdFeedback.class));
    }
}
