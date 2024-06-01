package com.barutta02.FitnessApp.periodo;

import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoRequest;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoResponse;
import com.barutta02.FitnessApp.user.User;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
public class PeriodoServiceTest {

    @InjectMocks
    private PeriodoService periodoService;

    @Mock
    private PeriodoRepository periodoRepository;

    @Mock
    private PeriodoMapper periodoMapper;

    @Mock
    private UserExtractor userExtractor;

    @Mock
    private Authentication authentication;

    private User user;
    private PeriodoRequest periodoRequest;
    private PeriodoResponse periodoResponse;
    private Periodo periodo;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1);
        user.setUsername("testuser");

        periodoRequest = mock(PeriodoRequest.class);
        periodoResponse = mock(PeriodoResponse.class);
        periodo = new Periodo();

    }


    @Test
    public void testSave_Success() {
        when(periodoMapper.toPeriodo(any(PeriodoRequest.class), any(User.class))).thenReturn(periodo);
        when(periodoRepository.save(any(Periodo.class))).thenReturn(periodo);
        when(periodoMapper.toPeriodoResponse(any(Periodo.class))).thenReturn(periodoResponse);
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        PeriodoResponse result = periodoService.save(periodoRequest, authentication);

        assertNotNull(result);
        verify(periodoRepository, times(1)).save(periodo);
    }

    @Test
    public void testSave_ThrowsOperationNotPermittedException() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        Periodo existingPeriodo = new Periodo();
        existingPeriodo.setId(2L);
        when(periodoMapper.toPeriodo(any(PeriodoRequest.class), any(User.class))).thenReturn(periodo);
        when(periodoRepository.findByCreatorAndAttivoIsTrue(any(User.class))).thenReturn(Optional.of(existingPeriodo));
        when(periodoRequest.attivo()).thenReturn(true);

        assertThrows(OperationNotPermittedException.class, () -> {
            periodoService.save(periodoRequest, authentication);
        });
    }

    @Test
    public void testFindByAuthenticatedUserAndId_Success() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        when(periodoRepository.findByIdAndCreator(anyLong(), any(User.class))).thenReturn(Optional.of(periodo));
        when(periodoMapper.toPeriodoResponse(any(Periodo.class))).thenReturn(periodoResponse);

        PeriodoResponse result = periodoService.findByAuthenticatedUserAndId(1L, authentication);

        assertNotNull(result);
        verify(periodoRepository, times(1)).findByIdAndCreator(1L, user);
    }

    @Test
    public void testFindByAuthenticatedUserAndId_ThrowsEntityNotFoundException() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        when(periodoRepository.findByIdAndCreator(anyLong(), any(User.class))).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            periodoService.findByAuthenticatedUserAndId(1L, authentication);
        });
    }

    @Test
    public void testFindAuthenticatedUserActivePeriodo_Success() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        when(periodoRepository.findByCreatorAndAttivoIsTrue(any(User.class))).thenReturn(Optional.of(periodo));
        when(periodoMapper.toPeriodoResponse(any(Periodo.class))).thenReturn(periodoResponse);

        PeriodoResponse result = periodoService.findAuthenticatedUserActivePeriodo(authentication);

        assertNotNull(result);
        verify(periodoRepository, times(1)).findByCreatorAndAttivoIsTrue(user);
    }

    @Test
    public void testFindAuthenticatedUserActivePeriodo_ReturnsNull() {

        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        when(periodoRepository.findByCreatorAndAttivoIsTrue(any(User.class))).thenReturn(Optional.empty());

        PeriodoResponse result = periodoService.findAuthenticatedUserActivePeriodo(authentication);

        assertNull(result);
    }

    @Test
    public void testDisableAuthenticatedUserActivePeriodo_Success() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        when(periodoRepository.findByCreatorAndAttivoIsTrue(any(User.class))).thenReturn(Optional.of(periodo));
        when(periodoRepository.save(any(Periodo.class))).thenReturn(periodo);
        when(periodoMapper.toPeriodoResponse(any(Periodo.class))).thenReturn(periodoResponse);

        PeriodoResponse result = periodoService.disableAuthenticatedUserActivePeriodo(authentication);

        assertNotNull(result);
        assertFalse(periodo.isAttivo());
        verify(periodoRepository, times(1)).save(periodo);
    }

    @Test
    public void testDisableAuthenticatedUserActivePeriodo_ThrowsEntityNotFoundException() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        when(periodoRepository.findByCreatorAndAttivoIsTrue(any(User.class))).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            periodoService.disableAuthenticatedUserActivePeriodo(authentication);
        });
    }

    @Test
    public void testFindAllAuthenticatedUserPeriodo_paginated() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        Page<Periodo> periodiPage = new PageImpl<>(List.of(periodo));
        when(periodoRepository.findByCreator(any(Pageable.class), any(User.class))).thenReturn(periodiPage);
        when(periodoMapper.toPeriodoResponse(any(Periodo.class))).thenReturn(periodoResponse);

        PageResponse<PeriodoResponse> result = periodoService.findAllAuthenticatedUserPeriodo_paginated(0, 10, authentication);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(periodoRepository, times(1)).findByCreator(any(Pageable.class), eq(user));
    }

    @Test
    public void testFindByIdAndUser_Success() {

        when(periodoRepository.findByIdAndCreator(anyLong(), any(User.class))).thenReturn(Optional.of(periodo));

        assertNotNull(periodoService.findByIdAndUser(1L, user));
        verify(periodoRepository, times(1)).findByIdAndCreator(1L, user);
    }

    @Test
    public void testFindByIdAndUser_ThrowsEntityNotFoundException() {
        when(periodoRepository.findByIdAndCreator(anyLong(), any(User.class))).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            periodoService.findByIdAndUser(1L, user);
        });
    }

    @Test
    public void testDeletePeriodo_Success() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        periodoService.deletePeriodo(1L, authentication);

        verify(periodoRepository, times(1)).deleteByIdAndCreator(1L, user);
    }
}
