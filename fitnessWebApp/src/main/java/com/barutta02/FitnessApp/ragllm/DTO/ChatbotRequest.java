package com.barutta02.FitnessApp.ragllm.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record ChatbotRequest(
    @NotNull(message = "La domanda da porre al chatbot è necessaria") 
    @NotEmpty(message = "La domanda da porre al chatbot è necessaria")
    String question,
    @NotNull(message = "I dati dell'utente che sta ponendo la domanda al chatbot sono necessari") 
    @NotEmpty(message = "I dati dell'utente che sta ponendo la domanda al chatbot sono necessari")
    String user_data    
) {
}