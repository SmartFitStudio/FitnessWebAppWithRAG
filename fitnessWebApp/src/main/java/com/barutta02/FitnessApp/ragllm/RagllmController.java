package com.barutta02.FitnessApp.ragllm;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barutta02.FitnessApp.ragllm.DTO.Question;
import com.barutta02.FitnessApp.ragllm.DTO.ChatbotResponse;
import com.barutta02.FitnessApp.ragllm.DTO.DietBase;
import com.barutta02.FitnessApp.ragllm.DTO.PianoAlimentareRag;
import com.barutta02.FitnessApp.ragllm.DTO.WorkoutBase;
import com.barutta02.FitnessApp.ragllm.DTO.WorkoutResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestBody;
import reactor.core.publisher.Mono;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;


@RestController
@RequestMapping(path = "ragllm")
@Tag(name = "Ragllm")
public class RagllmController {

    private final RagllmService ragllmService;

    public RagllmController(RagllmService ragllmService) {
        this.ragllmService = ragllmService;
    }

    @PostMapping(path = "/answer")
    public ResponseEntity<ChatbotResponse> answerQuestion(@Valid @RequestBody Question question, Authentication connectedUser) {
        return ResponseEntity.ok(ragllmService.answerQuestion(question, connectedUser).block());
    }

    @PostMapping(path = "/generateWorkout")
    public ResponseEntity<WorkoutResponse> generateWorkout(@Valid @RequestBody WorkoutBase workoutBase, Authentication connectedUser) {
        return ResponseEntity.ok(ragllmService.generateWorkout(workoutBase, connectedUser).block());
    }

    @PostMapping(path = "/generateDiet")
    public ResponseEntity<PianoAlimentareRag> generateDiet(@Valid @RequestBody DietBase dietBase, Authentication connectedUser) {
        return ResponseEntity.ok(ragllmService.generateDiet(dietBase, connectedUser).block());
    }

}
