package com.barutta02.FitnessApp.ragllm.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ChatbotResponse(
    @NotNull(message = "La risposta del chatbot è necessaria") 
    @NotEmpty(message = "La risposta del chatbot è necessaria")
    String response
) {
} 