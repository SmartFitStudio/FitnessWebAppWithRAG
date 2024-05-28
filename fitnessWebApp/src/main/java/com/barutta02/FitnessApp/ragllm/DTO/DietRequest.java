package com.barutta02.FitnessApp.ragllm.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record DietRequest(
    @NotNull(message = "I dati di base del piano alimentare sono necessari") 
    @NotEmpty(message = "I dati di base del piano alimentare sono necessari")
    String diet_data,
    @NotNull(message = "I dati dell'utente sono necessari") 
    @NotEmpty(message = "I dati dell'utente sono necessari")
    String user_data
) {
}
