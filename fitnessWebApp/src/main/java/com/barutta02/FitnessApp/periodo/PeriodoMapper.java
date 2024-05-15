package com.barutta02.FitnessApp.periodo;

import org.springframework.stereotype.Service;

import com.barutta02.FitnessApp.periodo.DTO.PeriodoRequest;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoResponse;
import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.user.User;

@Service
public class PeriodoMapper {

    public Periodo toPeriodo(PeriodoRequest periodoRequest, User creator) {
        return Periodo.builder()
                .id(periodoRequest.id())
                .name(periodoRequest.name())
                .data_inizio(periodoRequest.data_inizio())
                .data_fine(periodoRequest.data_fine())
                .durata_in_giorni(periodoRequest.durata_in_giorni())
                .obiettivo(periodoRequest.obiettivo())
                .creator(creator)
                .attivo(periodoRequest.attivo())
                .build();
    }

    public PeriodoResponse toPeriodoResponse(Periodo periodo) {
        return PeriodoResponse.builder()
                .id(periodo.getId())
                .name(periodo.getName())
                .data_inizio(periodo.getData_inizio())
                .data_fine(periodo.getData_fine())
                .durata_in_giorni(periodo.getDurata_in_giorni())
                .obiettivo(periodo.getObiettivo())
                .creator_username(periodo.getCreator().getUsername())
                .attivo(periodo.isAttivo())
                .build();
    }
}
