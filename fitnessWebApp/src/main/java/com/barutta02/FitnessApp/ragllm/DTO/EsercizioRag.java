package com.barutta02.FitnessApp.ragllm.DTO;

import jakarta.validation.constraints.NotNull;

public record EsercizioRag(
    @NotNull(message = "L'id dell'esercizio è necessario")
    Long id,
    @NotNull(message = "Il numero di serie dell'esercizio è necessario")
    Integer serie,
    @NotNull(message = "Il numero di ripetizioni dell'esercizio è necessario")
    Integer ripetizioni,
    @NotNull(message = "Il tempo di recupero tra le serie dell'esercizio è necessario")
    Integer recupero
) {
}
