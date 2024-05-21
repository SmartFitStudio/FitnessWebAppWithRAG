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
            .dataMisurazione(progresso.getDataMisurazione())
            .pesoKg(progresso.getPesoKg())
            .altezzaCm(progresso.getAltezzaCm())
            .percentualeMassaGrassa(progresso.getPercentualeMassaGrassa())
            .percentualeMassaMuscolare(progresso.getPercentualeMassaMuscolare())
            .note(progresso.getNote()!=null?progresso.getNote():"")
            .build();
    }

    public Progresso toProgresso(ProgressoRequest progressoRequest, User creator) {
        return Progresso.builder()
            .dataMisurazione(progressoRequest.dataMisurazione())
            .pesoKg(progressoRequest.pesoKg())
            .altezzaCm(progressoRequest.altezzaCm())
            .percentualeMassaGrassa(progressoRequest.percentualeMassaGrassa())
            .percentualeMassaMuscolare(progressoRequest.percentualeMassaMuscolare())
            .note(progressoRequest.note())
            .creator(creator)
            .build();
    }
}
