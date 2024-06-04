package com.barutta02.FitnessApp.notifica;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import com.barutta02.FitnessApp.Notifica.Notifica;
import com.barutta02.FitnessApp.Notifica.NotificaMapper;
import com.barutta02.FitnessApp.Notifica.NotificaRepository;
import com.barutta02.FitnessApp.Notifica.NotificaService;
import com.barutta02.FitnessApp.Notifica.DTO.NotificaResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.periodo.Periodo;
import com.barutta02.FitnessApp.periodo.PeriodoRepository;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoAllenamento;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoAllenamentoRepository;
import com.barutta02.FitnessApp.user.User;

import jakarta.persistence.EntityNotFoundException;

@ExtendWith(MockitoExtension.class)
public class NotificaServiceTest {

    @Mock
    private NotificaRepository notificaRepository;

    @Mock
    private PeriodoRepository periodoRepository;

    @Mock
    private PeriodoAllenamentoRepository periodoAllenamentoRepository;

    @Mock
    private NotificaMapper notificaMapper;

    @Mock
    private UserExtractor userExtractor;

    @InjectMocks
    private NotificaService notificaService;

    @Mock
    private Authentication authentication;

    private User user;
    private Notifica notifica;
    private NotificaResponse notificaResponse;
    private Periodo periodo;
    private ArrayList<PeriodoAllenamento> allenamenti;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1);
        user.setUsername("testUser");

        notifica = new Notifica();
        notifica.setId(1L);
        notifica.setCreator(user);

        notificaResponse = new NotificaResponse();

        periodo = new Periodo();
        periodo.setId(1L);
        periodo.setCreator(user);
        periodo.setData_inizio(LocalDate.now().minusDays(10));
        periodo.setDurata_in_giorni(7);

        PeriodoAllenamento allenamento = new PeriodoAllenamento();
        allenamento.setPeriodo(periodo);
        allenamento.setGiorno_del_periodo(1);
        allenamenti = new ArrayList<>();
        allenamenti.add(allenamento);
    }

    @Test
    public void testGetTodaysNotifications_WhenNotificationsExist() {
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        when(notificaRepository.existsByCreatorAndDate(user, LocalDate.now())).thenReturn(true);
        when(notificaRepository.findByCreatorAndDate(user, LocalDate.now())).thenReturn(Optional.of(new ArrayList<>(List.of(notifica))));
        when(notificaMapper.toNotificaResponse(notifica)).thenReturn(notificaResponse);

        ArrayList<NotificaResponse> responses = notificaService.getTodaysNotifications(authentication);

        assertFalse(responses.isEmpty());
        assertEquals(1, responses.size());
        verify(notificaRepository, times(1)).findByCreatorAndDate(user, LocalDate.now());
    }

    @Test
    public void testGetTodaysNotifications_WhenNoNotificationsExist() {
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        when(notificaRepository.existsByCreatorAndDate(user, LocalDate.now())).thenReturn(false);

        when(periodoRepository.findByCreatorAndAttivoIsTrue(user)).thenReturn(Optional.empty());


        assertFalse(notificaService.getTodaysNotifications(authentication) != null);
    }

    @Test
    public void testSetNotificationAsRead() {
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        when(notificaRepository.findById(1L)).thenReturn(Optional.of(notifica));
        when(notificaRepository.save(notifica)).thenReturn(notifica);
        when(notificaMapper.toNotificaResponse(notifica)).thenReturn(notificaResponse);

        NotificaResponse response = notificaService.setNotificationAsRead(1L, authentication);

        assertEquals(notificaResponse, response);
        assertTrue(notifica.isRead());
    }

    @Test
    public void testSetNotificationAsRead_NotFound() {
        when(notificaRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            notificaService.setNotificationAsRead(1L, authentication);
        });
    }

    @Test
    public void testSetNotificationAsRead_NotPermitted() {
        User otherUser = new User();
        otherUser.setId(2);
        notifica.setCreator(otherUser);
        
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        when(notificaRepository.findById(1L)).thenReturn(Optional.of(notifica));

        assertThrows(OperationNotPermittedException.class, () -> {
            notificaService.setNotificationAsRead(1L, authentication);
        });
    }
}
