package com.barutta02.FitnessApp.allenamento_esercizio;

import org.springframework.stereotype.Service;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioRequest;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioResponse;
import com.barutta02.FitnessApp.exercise.Exercise;
import com.barutta02.FitnessApp.user.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AllenamentoEsercizioMapper {

    public AllenamentoEsercizio toAllenamentoEsercizio(AllenamentoEsercizioRequest allenamentoEsercizioRequest, Allenamento allenamento,Exercise exercise,
            User creator) {
        return AllenamentoEsercizio.builder()
                .id(allenamentoEsercizioRequest.id())
                .allenamento(allenamento)
                .exercise(exercise)
                .index(allenamentoEsercizioRequest.index())
                .serie(allenamentoEsercizioRequest.serie())
                .ripetizioni(allenamentoEsercizioRequest.ripetizioni())
                .recupero(allenamentoEsercizioRequest.recupero())
                .build();
    }

    public AllenamentoEsercizioResponse toAllenamentoEsercizioResponse(AllenamentoEsercizio allenamentoEsercizio) {
        return AllenamentoEsercizioResponse.builder()
                .id(allenamentoEsercizio.getId())
                .allenamento_id(allenamentoEsercizio.getAllenamento().getId())// NOTE: Dipendenza transitiva
                .esercizio_id(allenamentoEsercizio.getExercise().getId())// NOTE: Dipendenza transitiva
                .creator(allenamentoEsercizio.getAllenamento().getCreator().getUsername()) // NOTE: Dipendenza
                                                                                           // transitiva, risolvi con
                                                                                           // getter
                .index(allenamentoEsercizio.getIndex())
                .serie(allenamentoEsercizio.getSerie())
                .ripetizioni(allenamentoEsercizio.getRipetizioni())
                .recupero(allenamentoEsercizio.getRecupero())
                .build();
    }
}
