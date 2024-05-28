package com.barutta02.FitnessApp.ragllm.DTO;

import java.util.ArrayList;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PastoRag(
    @NotNull(message = "La lista degli alimenti del pasto è necessaria") 
    @NotEmpty(message = "La lista degli alimenti del pasto è necessaria")
    ArrayList<AlimentoRag> alimenti
) {
}
