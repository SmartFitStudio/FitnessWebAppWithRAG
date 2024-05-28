package com.barutta02.FitnessApp.ragllm;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.barutta02.FitnessApp.ragllm.DTO.Question;
import com.barutta02.FitnessApp.ragllm.DTO.ChatbotRequest;
import com.barutta02.FitnessApp.ragllm.DTO.ChatbotResponse;
import com.barutta02.FitnessApp.ragllm.DTO.DietBase;
import com.barutta02.FitnessApp.ragllm.DTO.DietRequest;
import com.barutta02.FitnessApp.ragllm.DTO.PianoAlimentareRag;
import com.barutta02.FitnessApp.ragllm.DTO.WorkoutBase;
import com.barutta02.FitnessApp.ragllm.DTO.WorkoutRequest;
import com.barutta02.FitnessApp.ragllm.DTO.WorkoutResponse;

import lombok.AllArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.http.MediaType;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class RagllmService {

    private final WebClient webClient;
    private final UserDataExtractor userDataExtractor;

    public Mono<ChatbotResponse> answerQuestion(Question question, Authentication connectedUser) {
        ChatbotRequest request = new ChatbotRequest(question.question(), userDataExtractor.getUserDataComplete(connectedUser));
        return webClient.post()
                .uri("/answer")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatbotResponse.class);
    }
    
    public Mono<WorkoutResponse> generateWorkout(WorkoutBase workoutBase, Authentication connectedUser) {
        WorkoutRequest request = new WorkoutRequest(workoutBase.toString(), userDataExtractor.getUserDataMinimal(connectedUser), userDataExtractor.getUserExercises(connectedUser));
        return webClient.post()
                .uri("/generateWorkout")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(WorkoutResponse.class);
    }

    public Mono<PianoAlimentareRag> generateDiet(DietBase dietBase, Authentication connectedUser) {
        DietRequest request = new DietRequest(dietBase.toString(), userDataExtractor.getUserDataMinimal(connectedUser));
        return webClient.post()
                .uri("/generateDiet")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(PianoAlimentareRag.class);
    }
}
