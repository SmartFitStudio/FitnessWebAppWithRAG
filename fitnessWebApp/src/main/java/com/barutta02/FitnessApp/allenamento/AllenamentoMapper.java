package com.barutta02.FitnessApp.allenamento;

import org.springframework.stereotype.Service;

import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoRequest;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.user.User;

@Service
public class AllenamentoMapper {
    public Allenamento toAllenamento(AllenamentoRequest allenamentoRequest, User creator) {
        return Allenamento.builder()
                .id(allenamentoRequest.id())
                .name(allenamentoRequest.name())
                .description(allenamentoRequest.description())
                .durata_in_ore(allenamentoRequest.durata_in_ore())
                .creator(creator)
                .build();
    }
    public AllenamentoResponse toAllenamentoResponse(Allenamento allenamento) {
        return AllenamentoResponse.builder()
                .id(allenamento.getId())
                .name(allenamento.getName())
                .description(allenamento.getDescription())
                .durata_in_ore(allenamento.getDurata_in_ore())
                .creator_username(allenamento.getCreator().getUsername())
                .build();
    }

}
