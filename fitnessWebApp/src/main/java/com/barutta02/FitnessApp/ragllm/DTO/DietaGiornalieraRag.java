package com.barutta02.FitnessApp.ragllm.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record DietaGiornalieraRag(
    @NotNull(message = "Il pasto della colazione è necessario")
    @NotEmpty(message = "Il pasto della colazione è necessario")
    PastoRag colazione,
    @NotNull(message = "Il pasto del pranzo è necessario")
    @NotEmpty(message = "Il pasto del pranzo è necessario")
    PastoRag pranzo,
    @NotNull(message = "Il pasto della cena è necessario")
    @NotEmpty(message = "Il pasto della cena è necessario")
    PastoRag cena
) {
}
