package com.barutta02.FitnessApp.periodo_allenamento.DTO;

import com.barutta02.FitnessApp.periodo_allenamento.PeriodoGiornata;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PeriodoAllenamentoRequest(
        Long id,
        @NotNull(message = "L'id dell'allenamento è necessario")
        Long id_allenamento,

        @NotNull(message = "L'id del peroodo è necessario")
        Long id_periodo,

        @NotNull(message = "Il giorno del peroodo è necessario")
        int giorno_del_periodo,

        @NotNull(message = "Il periodo della giornata è necessario")
        PeriodoGiornata periodo_giornata) {
}