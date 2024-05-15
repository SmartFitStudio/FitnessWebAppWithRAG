package com.barutta02.FitnessApp.Chatbot;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.MediaType;
import reactor.core.publisher.Mono;


@Service
public class ChatbotService {

    private WebClient webClient;

    public ChatbotService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Mono<String> answerQuestion(String question) {
        return webClient.post()
                .uri("/answer")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromValue("text=" + question))
                .retrieve()
                .bodyToMono(String.class);
    }
}
