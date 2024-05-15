package com.barutta02.FitnessApp.progresso;

import org.springframework.stereotype.Service;

import com.barutta02.FitnessApp.progresso.DTO.ProgressoRequest;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoResponse;
import com.barutta02.FitnessApp.user.User;

@Service
public class ProgressoMapper {

    public ProgressoResponse toProgressoResponse(Progresso progresso) {
        return ProgressoResponse.builder()
            .id(progresso.getId())
            .data_misurazione(progresso.getData_misurazione())
            .peso_kg(progresso.getPeso_kg())
            .altezza_cm(progresso.getAltezza_cm())
            .percentaule_massa_grassa(progresso.getPercentaule_massa_grassa())
            .percentaule_massa_magra(progresso.getPercentaule_massa_magra())
            .username(progresso.getCreator().getUsername())
            .build();
    }

    public Progresso toProgresso(ProgressoRequest progressoRequest, User creator) {
        return Progresso.builder()
            .id(progressoRequest.id())
            .data_misurazione(progressoRequest.data_misurazione())
            .peso_kg(progressoRequest.peso_kg())
            .altezza_cm(progressoRequest.altezza_cm())
            .percentaule_massa_grassa(progressoRequest.percentaule_massa_grassa())
            .percentaule_massa_magra(progressoRequest.percentaule_massa_magra())
            .creator(creator)
            .build();
    }
}
