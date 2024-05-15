package com.barutta02.FitnessApp.periodo_allenamento;

import org.springframework.stereotype.Service;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.periodo.Periodo;
import com.barutta02.FitnessApp.periodo_allenamento.DTO.PeriodoAllenamentoRequest;
import com.barutta02.FitnessApp.periodo_allenamento.DTO.PeriodoAllenamentoResponse;
import com.barutta02.FitnessApp.user.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PeriodoAllenamentoMapper {

    public PeriodoAllenamento toPeriodoAllenamento(PeriodoAllenamentoRequest PeriodoAllenamentoRequest,
            Allenamento allenamento, Periodo periodo,
            User creator) {
        return PeriodoAllenamento.builder()
                .id(PeriodoAllenamentoRequest.id())
                .allenamento(allenamento)
                .periodo(periodo)
                .giorno_del_periodo(PeriodoAllenamentoRequest.giorno_del_periodo())
                .periodo_giornata(PeriodoAllenamentoRequest.periodo_giornata())
                .build();
    }

    public PeriodoAllenamentoResponse toPeriodoAllenamentoResponse(PeriodoAllenamento PeriodoAllenamento) {
        return PeriodoAllenamentoResponse.builder()
                .id(PeriodoAllenamento.getId())
                .id_allenamento(PeriodoAllenamento.getAllenamento().getId())// NOTE: Dipendenza transitiva
                .id_periodo(PeriodoAllenamento.getPeriodo().getId())// NOTE: Dipendenza transitiva
                .giorno_del_periodo(PeriodoAllenamento.getGiorno_del_periodo())
                .periodo_giornata(PeriodoAllenamento.getPeriodo_giornata())
                .build();
    }
}
