package com.barutta02.FitnessApp.ragllm;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barutta02.FitnessApp.ragllm.DTO.Question;
import com.barutta02.FitnessApp.ragllm.DTO.RagllmResponse;

import io.swagger.v3.oas.annotations.tags.Tag;

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
    public ResponseEntity<RagllmResponse> answerQuestion(@RequestBody Question question, Authentication connectedUser) {
        return ResponseEntity.ok(ragllmService.answerQuestion(question, connectedUser).block());
    }
}
