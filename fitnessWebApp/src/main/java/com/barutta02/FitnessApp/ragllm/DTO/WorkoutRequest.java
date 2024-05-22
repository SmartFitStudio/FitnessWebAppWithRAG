package com.barutta02.FitnessApp.ragllm.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record WorkoutRequest(
    @NotNull(message = "I dati di base dell'allenamento sono necessari") 
    @NotEmpty(message = "I dati di base dell'allenamento sono necessari")
    String workout_data,
    @NotNull(message = "I dati dell'utente sono necessari") 
    @NotEmpty(message = "I dati dell'utente sono necessari")
    String user_data,
    @NotNull(message = "Gli esercizi disponibili sono necessari") 
    @NotEmpty(message = "Gli esercizi disponibili sono necessari")
    String available_exercises
) {
}
