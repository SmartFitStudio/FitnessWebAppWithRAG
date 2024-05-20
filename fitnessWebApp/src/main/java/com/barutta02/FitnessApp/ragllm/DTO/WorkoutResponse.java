package com.barutta02.FitnessApp.ragllm.DTO;

import java.util.ArrayList;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record WorkoutResponse(
    @NotNull(message = "Gli esercizi dell'allenamento sono necessari") 
    @NotEmpty(message = "Gli esercizi dell'allenamento sono necessari")
    ArrayList<EsercizioRag> esercizi
) {
}
