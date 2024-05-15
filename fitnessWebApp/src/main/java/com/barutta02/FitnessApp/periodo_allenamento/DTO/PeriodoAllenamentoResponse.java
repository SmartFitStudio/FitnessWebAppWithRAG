package com.barutta02.FitnessApp.periodo_allenamento.DTO;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.periodo.Periodo;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoGiornata;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PeriodoAllenamentoResponse {

        @NotNull(message = "L'id del periodo-allenamento è necessario")
        private Long id;
        @NotNull(message = "L'id dell'allenamento è necessario")
        private Long id_allenamento;
        @NotNull(message = "L'id del periodo è necessario")
        private Long id_periodo;
        @NotNull(message = "Il giorno del periodo è necessario")
        private int giorno_del_periodo;
        @NotNull(message = "Il periodo della giornata è necessario")
        private PeriodoGiornata periodo_giornata;
}
