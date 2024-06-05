package com.barutta02.FitnessApp.periodo;

import com.barutta02.FitnessApp.periodo.DTO.PeriodoRequest;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoResponse;
import com.barutta02.FitnessApp.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;

public class PeriodoMapperTest {

    private PeriodoMapper periodoMapper;

    @BeforeEach
    public void setUp() {
        periodoMapper = new PeriodoMapper();
    }

    @Test
    public void testToPeriodo() {
        PeriodoRequest request = new PeriodoRequest(0L,"nome", Obiettivo.DEFINIZIONE,7, LocalDate.now(), LocalDate.now().plusDays(7), true);
        User creator = new User();


        Periodo periodo = periodoMapper.toPeriodo(request, creator);

        assertEquals(request.id(), periodo.getId());
        assertEquals(request.name(), periodo.getName());
        assertEquals(request.data_inizio(), periodo.getData_inizio());
        assertEquals(request.data_fine(), periodo.getData_fine());
        assertEquals(request.durata_in_giorni(), periodo.getDurata_in_giorni());
        assertEquals(request.obiettivo(), periodo.getObiettivo());
        assertEquals(creator, periodo.getCreator());
    }

    @Test
    public void testToPeriodoResponse() {
        Periodo periodo = Periodo.builder()
                .id(0L)
                .name("nome")
                .data_inizio(LocalDate.now())
                .data_fine(LocalDate.now().plusDays(7))
                .durata_in_giorni(7)
                .obiettivo(Obiettivo.DEFINIZIONE)
                .creator(new User())
                .attivo(true)
                .build();


        PeriodoResponse response = periodoMapper.toPeriodoResponse(periodo);

        assertEquals(periodo.getId(), response.getId());
        assertEquals(periodo.getName(), response.getName());
        assertEquals(periodo.getData_inizio(), response.getData_inizio());
        assertEquals(periodo.getData_fine(), response.getData_fine());
        assertEquals(periodo.getDurata_in_giorni(), response.getDurata_in_giorni());
        assertEquals(periodo.getObiettivo(), response.getObiettivo());
        assertEquals(periodo.getCreator().getUsername(), response.getCreator_username());
    }
}