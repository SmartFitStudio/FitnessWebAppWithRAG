package com.barutta02.FitnessApp.allenamento;

import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoRequest;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AllenamentoMapperTest {

    private AllenamentoMapper allenamentoMapper;

    @BeforeEach
    public void setUp() {
        allenamentoMapper = new AllenamentoMapper();
    }

    @Test
    public void testToAllenamento() {
        AllenamentoRequest request = new AllenamentoRequest(0L, "nome", "descrizione", 1);
        User creator = new User();

        // Set up the request and creator here...

        Allenamento allenamento = allenamentoMapper.toAllenamento(request, creator);

        assertEquals(request.id(), allenamento.getId());
        assertEquals(request.name(), allenamento.getName());
        assertEquals(request.description(), allenamento.getDescription());
        assertEquals(request.durata_in_ore(), allenamento.getDurata_in_ore());
        assertEquals(creator, allenamento.getCreator());
    }

    @Test
    public void testToAllenamentoResponse() {
        Allenamento allenamento = Allenamento.builder()
                .id(0L)
                .name("nome")
                .description("descrizione")
                .durata_in_ore(1)
                .creator(new User())
                .build();

        // Set up the allenamento here...

        AllenamentoResponse response = allenamentoMapper.toAllenamentoResponse(allenamento);

        assertEquals(allenamento.getId(), response.getId());
        assertEquals(allenamento.getName(), response.getName());
        assertEquals(allenamento.getDescription(), response.getDescription());
        assertEquals(allenamento.getDurata_in_ore(), response.getDurata_in_ore());
        assertEquals(allenamento.getCreator().getUsername(), response.getCreator_username());
    }
}