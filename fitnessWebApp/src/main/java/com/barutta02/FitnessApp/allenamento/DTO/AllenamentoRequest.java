package com.barutta02.FitnessApp.allenamento.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record AllenamentoRequest(
    Long id,

    @NotNull(message = "Il nome dell'esercizio è necessario") // Exercise name is mandatory, if not provided, return error code 100
    @NotEmpty(message = "Il nome dell'esercizio è necessario")
    String name,

    @NotNull(message = "La descrizione dell'esercizio è necessario") // Exercise name is mandatory, if not provided, return error code 100
    String description,
    
    @Min(value = 1, message = "Value must be greater than 0")
    float durata_in_ore
) {
} 