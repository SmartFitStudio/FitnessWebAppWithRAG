package com.barutta02.FitnessApp.allenamento_esercizio;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.allenamento.AllenamentoService;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioRequest;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioResponse;
import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exercise.Exercise;
import com.barutta02.FitnessApp.exercise.ExerciseService;
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
public class AllenamentoEsercizioServiceTest {

    @InjectMocks
    private AllenamentoEsercizioService allenamentoEsercizioService;

    @Mock
    private AllenamentoEsercizioRepository allenamentoEsercizioRepository;

    @Mock
    private AllenamentoService allenamentoService;

    @Mock
    private ExerciseService exerciseService;

    @Mock
    private AllenamentoEsercizioMapper allenamentoEsercizioMapper;

    @Mock
    private UserExtractor userExtractor;

    @Mock
    private Authentication authentication;

    private User user;
    private AllenamentoEsercizioRequest allenamentoEsercizioRequest;
    private AllenamentoEsercizioResponse allenamentoEsercizioResponse;
    private AllenamentoEsercizio allenamentoEsercizio;
    private Allenamento allenamento;
    private Exercise exercise;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1);
        user.setUsername("testuser");

        allenamento = new Allenamento();
        exercise = new Exercise();

        allenamentoEsercizioRequest = mock(AllenamentoEsercizioRequest.class);
        allenamentoEsercizioResponse = mock(AllenamentoEsercizioResponse.class);
        allenamentoEsercizio = new AllenamentoEsercizio();

        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);
    }

    @Test
    public void testSave_Success() {
        when(allenamentoService.findByIdAndCreator(anyLong(), any(User.class))).thenReturn(allenamento);
        when(exerciseService.findByIdAndCreatorOrDefault_creator(anyLong(), any(User.class))).thenReturn(exercise);
        when(allenamentoEsercizioMapper.toAllenamentoEsercizio(any(AllenamentoEsercizioRequest.class), any(Allenamento.class), any(Exercise.class), any(User.class))).thenReturn(allenamentoEsercizio);
        when(allenamentoEsercizioRepository.save(any(AllenamentoEsercizio.class))).thenReturn(allenamentoEsercizio);
        when(allenamentoEsercizioMapper.toAllenamentoEsercizioResponse(any(AllenamentoEsercizio.class))).thenReturn(allenamentoEsercizioResponse);

        AllenamentoEsercizioResponse result = allenamentoEsercizioService.save(allenamentoEsercizioRequest, authentication);

        assertNotNull(result);
        verify(allenamentoEsercizioRepository, times(1)).save(allenamentoEsercizio);
    }

    @Test
    public void testFindAllAuthUserAllenamentoEsercizioByAllenamentoId_paginated() {
        Page<AllenamentoEsercizio> allenamentiEserciziPage = new PageImpl<>(List.of(allenamentoEsercizio));
        when(allenamentoEsercizioRepository.findByAllenamento_IdAndAllenamento_Creator(any(Pageable.class), anyLong(), any(User.class))).thenReturn(allenamentiEserciziPage);
        when(allenamentoEsercizioMapper.toAllenamentoEsercizioResponse(any(AllenamentoEsercizio.class))).thenReturn(allenamentoEsercizioResponse);

        PageResponse<AllenamentoEsercizioResponse> result = allenamentoEsercizioService.findAllAuthUserAllenamentoEsercizioByAllenamentoId_paginated(0, 10, 1L, authentication);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(allenamentoEsercizioRepository, times(1)).findByAllenamento_IdAndAllenamento_Creator(any(Pageable.class), eq(1L), eq(user));
    }

    @Test
    public void testFindAllAuthUserAllenamentoEsercizioByAllenamentoId_noPagination_Success() {
        ArrayList<AllenamentoEsercizio> listExercises =  List.of(allenamentoEsercizio).stream().collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        when(allenamentoEsercizioRepository.findByAllenamento_IdAndAllenamento_Creator(anyLong(), any(User.class))).thenReturn(Optional.of(listExercises));
        when(allenamentoEsercizioMapper.toAllenamentoEsercizioResponse(any(AllenamentoEsercizio.class))).thenReturn(allenamentoEsercizioResponse);

        ArrayList<AllenamentoEsercizioResponse> result = allenamentoEsercizioService.findAllAuthUserAllenamentoEsercizioByAllenamentoId_noPagination(1L, authentication);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(allenamentoEsercizioRepository, times(1)).findByAllenamento_IdAndAllenamento_Creator(eq(1L), eq(user));
    }

    @Test
    public void testFindAllAuthUserAllenamentoEsercizioByAllenamentoId_noPagination_ThrowsEntityNotFoundException() {
        when(allenamentoEsercizioRepository.findByAllenamento_IdAndAllenamento_Creator(anyLong(), any(User.class))).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            allenamentoEsercizioService.findAllAuthUserAllenamentoEsercizioByAllenamentoId_noPagination(1L, authentication);
        });
    }

    @Test
    public void testDeleteById_Success() {
        allenamentoEsercizioService.deleteById(1L, authentication);

        verify(allenamentoEsercizioRepository, times(1)).deleteByIdAndAllenamento_Creator(1L, user);
    }
}
