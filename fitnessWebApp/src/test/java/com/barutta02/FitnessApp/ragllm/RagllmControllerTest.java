package com.barutta02.FitnessApp.ragllm;

import com.barutta02.FitnessApp.ragllm.DTO.Question;
import com.barutta02.FitnessApp.ragllm.DTO.ChatbotResponse;
import com.barutta02.FitnessApp.ragllm.DTO.DietBase;
import com.barutta02.FitnessApp.ragllm.DTO.DietaGiornalieraRag;
import com.barutta02.FitnessApp.ragllm.DTO.PianoAlimentareRag;
import com.barutta02.FitnessApp.ragllm.DTO.WorkoutBase;
import com.barutta02.FitnessApp.ragllm.DTO.WorkoutResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import reactor.core.publisher.Mono;

import static org.mockito.Mockito.*;

import java.util.ArrayList;

public class RagllmControllerTest {

    @Mock
    RagllmService ragllmService;

    @Mock
    Authentication connectedUser;

    @InjectMocks
    RagllmController ragllmController;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAnswerQuestion() {
        Question question = new Question("Come posso allenare il petto?");
        ChatbotResponse chatbotResponse = new ChatbotResponse("Panca piana, spinte con manubri ...");

        when(ragllmService.answerQuestion(question, connectedUser)).thenReturn(Mono.just(chatbotResponse));

        ResponseEntity<ChatbotResponse> expectedResponse = ResponseEntity.ok(chatbotResponse);
        ResponseEntity<ChatbotResponse> actualResponse = ragllmController.answerQuestion(question, connectedUser);

        assert expectedResponse.equals(actualResponse);
        verify(ragllmService, times(1)).answerQuestion(question, connectedUser);
    }

    @Test
    public void testGenerateWorkout() {
        WorkoutBase workoutBase = new WorkoutBase("Nome","Descrizione", 2.5f);
        WorkoutResponse workoutResponse = new WorkoutResponse(new ArrayList<>());

        when(ragllmService.generateWorkout(workoutBase, connectedUser)).thenReturn(Mono.just(workoutResponse));

        ResponseEntity<WorkoutResponse> expectedResponse = ResponseEntity.ok(workoutResponse);
        ResponseEntity<WorkoutResponse> actualResponse = ragllmController.generateWorkout(workoutBase, connectedUser);

        assert expectedResponse.equals(actualResponse);
        verify(ragllmService, times(1)).generateWorkout(workoutBase, connectedUser);
    }

    @Test
    public void testGenerateDiet() {
        DietBase dietBase = new DietBase("Titolo","Descrizione", new DietCategory[]{DietCategory.VEGANA, DietCategory.SENZA_GLUTINE});
        DietaGiornalieraRag dietaGiornalieraRag = new DietaGiornalieraRag(null, null, null);
        PianoAlimentareRag pianoAlimentareRag = new PianoAlimentareRag(dietaGiornalieraRag,dietaGiornalieraRag,dietaGiornalieraRag,dietaGiornalieraRag,dietaGiornalieraRag,dietaGiornalieraRag,dietaGiornalieraRag,"Dieta per vegani celiaci");

        when(ragllmService.generateDiet(dietBase, connectedUser)).thenReturn(Mono.just(pianoAlimentareRag));

        ResponseEntity<PianoAlimentareRag> expectedResponse = ResponseEntity.ok(pianoAlimentareRag);
        ResponseEntity<PianoAlimentareRag> actualResponse = ragllmController.generateDiet(dietBase, connectedUser);

        assert expectedResponse.equals(actualResponse);
        verify(ragllmService, times(1)).generateDiet(dietBase, connectedUser);
    }
}