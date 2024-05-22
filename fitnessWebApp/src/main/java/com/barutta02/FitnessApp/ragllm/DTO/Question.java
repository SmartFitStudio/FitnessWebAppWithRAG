package com.barutta02.FitnessApp.ragllm.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record Question(
    @NotNull(message = "La domanda da porre al chatbot è necessaria") 
    @NotEmpty(message = "La domanda da porre al chatbot è necessaria")
    String question
) {
}
