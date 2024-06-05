package com.barutta02.FitnessApp.allenamento_esercizio.DTO;

import jakarta.validation.constraints.NotNull;

public record AllenamentoEsercizioRequest(
        Long id,
        @NotNull(message = "L'id dell'allenamento è necessario") 
        Long id_allenamento,
        @NotNull(message = "L'id dell'esercizio è necessario") 
        Long id_esercizio,

        @NotNull(message = "L'indice dell'esercizio è necessario") 
        int index,

        @NotNull(message = "Il numero di ripetizioni è necessario")
        int ripetizioni,
        @NotNull(message = "Il numero di serie è necessario")
        int serie,
        @NotNull(message = "Il tempo di recupero è necessario") 
        int recupero) {}