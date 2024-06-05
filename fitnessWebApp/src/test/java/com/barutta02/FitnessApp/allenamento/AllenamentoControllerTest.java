package com.barutta02.FitnessApp.allenamento;

import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoRequest;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AllenamentoControllerTest {

    @InjectMocks
    private AllenamentoController allenamentoController;

    @Mock
    private AllenamentoService service;

    @Mock
    private Authentication connectedUser;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAllAllenamentoByAuthenticatedUser_noPagination() {
        ArrayList<AllenamentoResponse> allenamentoResponses = new ArrayList<>();
        when(service.findAllAuthUserAllenamento_noPagination(connectedUser)).thenReturn(allenamentoResponses);

        ResponseEntity<ArrayList<AllenamentoResponse>> response = allenamentoController.findAllAllenamentoByAuthenticatedUser_noPagination(connectedUser);

        assertEquals(ResponseEntity.ok(allenamentoResponses), response);
        verify(service, times(1)).findAllAuthUserAllenamento_noPagination(connectedUser);
    }

    @Test
    public void testDeleteAllenamento() {
        Long allenamento_id = 1L;
        doNothing().when(service).deleteById(allenamento_id, connectedUser);

        ResponseEntity<?> response = allenamentoController.deleteAllenamento(allenamento_id, connectedUser);

        assertEquals(ResponseEntity.noContent().build(), response);
        verify(service, times(1)).deleteById(allenamento_id, connectedUser);
    }

}