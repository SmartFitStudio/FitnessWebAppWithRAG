package com.barutta02.FitnessApp.periodo_allenamento;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.allenamento.AllenamentoService;
import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.periodo.Periodo;
import com.barutta02.FitnessApp.periodo.PeriodoService;
import com.barutta02.FitnessApp.periodo_allenamento.DTO.PeriodoAllenamentoRequest;
import com.barutta02.FitnessApp.periodo_allenamento.DTO.PeriodoAllenamentoResponse;
import com.barutta02.FitnessApp.user.User;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.data.domain.*;

import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
public class PeriodoAllenamentoServiceTest {

    @InjectMocks
    private PeriodoAllenamentoService periodoAllenamentoService;

    @Mock
    private PeriodoAllenamentoRepository periodoAllenamentoRepo;

    @Mock
    private AllenamentoService allenamentoService;

    @Mock
    private PeriodoService periodoService;

    @Mock
    private PeriodoAllenamentoMapper periodoAllenamentoMapper;

    @Mock
    private UserExtractor userExtractor;

    @Mock
    private Authentication authentication;

    private User user;
    private PeriodoAllenamentoRequest periodoAllenamentoRequest;
    private PeriodoAllenamentoResponse periodoAllenamentoResponse;
    private PeriodoAllenamento periodoAllenamento;
    private Allenamento allenamento;
    private Periodo periodo;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1);
        user.setUsername("testuser");

        allenamento = new Allenamento();
        allenamento.setCreator(user);

        periodo = new Periodo();
        periodo.setCreator(user);

        periodoAllenamentoRequest = mock(PeriodoAllenamentoRequest.class);
        periodoAllenamentoResponse = mock(PeriodoAllenamentoResponse.class);
        periodoAllenamento = new PeriodoAllenamento();

        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);
    }

    @Test
    public void testSave_Success() {
        when(allenamentoService.findByIdAndCreator(anyLong(), any(User.class))).thenReturn(allenamento);
        when(periodoService.findByIdAndUser(anyLong(), any(User.class))).thenReturn(periodo);
        when(periodoAllenamentoMapper.toPeriodoAllenamento(any(PeriodoAllenamentoRequest.class), any(Allenamento.class), any(Periodo.class), any(User.class))).thenReturn(periodoAllenamento);
        when(periodoAllenamentoRepo.save(any(PeriodoAllenamento.class))).thenReturn(periodoAllenamento);
        when(periodoAllenamentoMapper.toPeriodoAllenamentoResponse(any(PeriodoAllenamento.class))).thenReturn(periodoAllenamentoResponse);

        PeriodoAllenamentoResponse result = periodoAllenamentoService.save(periodoAllenamentoRequest, authentication);

        assertNotNull(result);
        verify(periodoAllenamentoRepo, times(1)).save(periodoAllenamento);
    }

    @Test
    public void testSave_ThrowsOperationNotPermittedException() {
        User anotherUser = new User();
        anotherUser.setId(2);

        allenamento.setCreator(anotherUser);

        when(allenamentoService.findByIdAndCreator(anyLong(), any(User.class))).thenReturn(allenamento);
        when(periodoService.findByIdAndUser(anyLong(), any(User.class))).thenReturn(periodo);

        assertThrows(OperationNotPermittedException.class, () -> {
            periodoAllenamentoService.save(periodoAllenamentoRequest, authentication);
        });
    }

    @Test
    public void testFindAllAuthUserPeriodoAllenamentoByPeriodoId_paginated() {
        Page<PeriodoAllenamento> periodoAllenamentiPage = new PageImpl<>(List.of(periodoAllenamento));
        when(periodoAllenamentoRepo.findByPeriodo_IdAndPeriodo_Creator(any(Pageable.class), anyLong(), any(User.class))).thenReturn(periodoAllenamentiPage);
        when(periodoAllenamentoMapper.toPeriodoAllenamentoResponse(any(PeriodoAllenamento.class))).thenReturn(periodoAllenamentoResponse);

        PageResponse<PeriodoAllenamentoResponse> result = periodoAllenamentoService.findAllAuthUserPeriodoAllenamentoByPeriodoId_paginated(0, 10, 1L, authentication);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(periodoAllenamentoRepo, times(1)).findByPeriodo_IdAndPeriodo_Creator(any(Pageable.class), eq(1L), eq(user));
    }

    @Test
    public void testFindAllAuthUserPeriodoAllenamentoByPeriodoId_noPagination_Success() {
        ArrayList<PeriodoAllenamento> listaAllenamenti = List.of(periodoAllenamento).stream().collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        when(periodoAllenamentoRepo.findByPeriodo_IdAndPeriodo_Creator(anyLong(), any(User.class))).thenReturn(Optional.of(listaAllenamenti));
        when(periodoAllenamentoMapper.toPeriodoAllenamentoResponse(any(PeriodoAllenamento.class))).thenReturn(periodoAllenamentoResponse);

        ArrayList<PeriodoAllenamentoResponse> result = periodoAllenamentoService.findAllAuthUserPeriodoAllenamentoByPeriodoId_noPagination(1L, authentication);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(periodoAllenamentoRepo, times(1)).findByPeriodo_IdAndPeriodo_Creator(eq(1L), eq(user));
    }

    @Test
    public void testFindAllAuthUserPeriodoAllenamentoByPeriodoId_noPagination_ThrowsEntityNotFoundException() {
        when(periodoAllenamentoRepo.findByPeriodo_IdAndPeriodo_Creator(anyLong(), any(User.class))).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            periodoAllenamentoService.findAllAuthUserPeriodoAllenamentoByPeriodoId_noPagination(1L, authentication);
        });
    }

    @Test
    public void testDeleteById_Success() {
        periodoAllenamentoService.deleteById(1L, authentication);

        verify(periodoAllenamentoRepo, times(1)).deleteByIdAndPeriodo_Creator(1L, user);
    }
}
