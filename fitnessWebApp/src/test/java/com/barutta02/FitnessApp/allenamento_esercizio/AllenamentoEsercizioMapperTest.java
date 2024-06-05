package com.barutta02.FitnessApp.allenamento_esercizio;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioRequest;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioResponse;
import com.barutta02.FitnessApp.exercise.Exercise;
import com.barutta02.FitnessApp.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AllenamentoEsercizioMapperTest {

    private AllenamentoEsercizioMapper allenamentoEsercizioMapper;

    @BeforeEach
    public void setUp() {
        allenamentoEsercizioMapper = new AllenamentoEsercizioMapper();
    }

    @Test
    public void testToAllenamentoEsercizio() {
        AllenamentoEsercizioRequest request = new AllenamentoEsercizioRequest(1L,1L,1L,1,1,1,1);
        Allenamento allenamento = new Allenamento();
        Exercise exercise = new Exercise();
        User creator = new User();


        AllenamentoEsercizio allenamentoEsercizio = allenamentoEsercizioMapper.toAllenamentoEsercizio(request, allenamento, exercise, creator);

        assertEquals(request.id(), allenamentoEsercizio.getId());
        assertEquals(allenamento, allenamentoEsercizio.getAllenamento());
        assertEquals(exercise, allenamentoEsercizio.getExercise());
    }

    @Test
    public void testToAllenamentoEsercizioResponse() {
        User creator = new User();
        AllenamentoEsercizio allenamentoEsercizio = AllenamentoEsercizio.builder()
                .id(1L)
                .allenamento(Allenamento.builder().creator(creator).build())
                .exercise(Exercise.builder().id(1L).creator(creator).build())
                .index(1)
                .serie(1)
                .ripetizioni(1)
                .recupero(1)
                .build();


        AllenamentoEsercizioResponse response = allenamentoEsercizioMapper.toAllenamentoEsercizioResponse(allenamentoEsercizio);

        assertEquals(allenamentoEsercizio.getId(), response.getId());
        assertEquals(allenamentoEsercizio.getAllenamento().getId(), response.getAllenamento_id());
        assertEquals(allenamentoEsercizio.getExercise().getId(), response.getEsercizio_id());
    }
}