package com.barutta02.FitnessApp.Chatbot;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import reactor.core.publisher.Mono;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping(path = "chatbot")
public class ChatbotController {

    private final ChatbotService chatbotService;

    public ChatbotController(ChatbotService chatbotService) {
        this.chatbotService = chatbotService;
    }

    @PostMapping(path = "/answer")
    public ResponseEntity<String> answerQuestion(@RequestBody String question) {
        return ResponseEntity.ok(chatbotService.answerQuestion(question).block());
    }
}
