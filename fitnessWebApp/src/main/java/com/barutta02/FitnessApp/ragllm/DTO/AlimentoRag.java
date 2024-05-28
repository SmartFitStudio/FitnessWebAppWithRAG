package com.barutta02.FitnessApp.ragllm.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record AlimentoRag(
    @NotNull(message = "Il nome dell'alimento è necessario")
    @NotEmpty(message = "Il nome dell'alimento è necessario")
    String nome,
    @NotNull(message = "La quantità in grammi dell'alimento è necessaria")
    @NotEmpty(message = "La quantità in grammi dell'alimento è necessaria")
    Integer quantita,
    @NotNull(message = "Le calorie dell'alimento sono necessarie")
    @NotEmpty(message = "Le calorie dell'alimento sono necessarie")
    Integer calorie
) {
}
