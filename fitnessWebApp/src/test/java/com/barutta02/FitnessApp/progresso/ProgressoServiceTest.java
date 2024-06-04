package com.barutta02.FitnessApp.progresso;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoRequest;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoResponse;
import com.barutta02.FitnessApp.user.User;

@ExtendWith(MockitoExtension.class)
public class ProgressoServiceTest {

    @Mock
    private ProgressoRepository progressoRepository;

    @Mock
    private ProgressoMapper progressoMapper;

    @Mock
    private UserExtractor userExtractor;

    @InjectMocks
    private ProgressoService progressoService;

    @Mock
    private Authentication authentication;

    private User user;
    private Progresso progresso;
    private ProgressoRequest progressoRequest;
    private ProgressoResponse progressoResponse;
    private ArrayList<Progresso> progressoList;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1);
        user.setUsername("testUser");

        progresso = new Progresso();
        progresso.setId(1L);
        progresso.setCreator(user);

        progressoRequest = new ProgressoRequest(LocalDate.now(),2,4,5,6,"note");
        progressoResponse = new ProgressoResponse();

        progressoList = new ArrayList<>();
        progressoList.add(progresso);
    }

    @Test
    public void testSave() {
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        when(progressoMapper.toProgresso(progressoRequest, user)).thenReturn(progresso);
        when(progressoRepository.save(progresso)).thenReturn(progresso);
        when(progressoMapper.toProgressoResponse(progresso)).thenReturn(progressoResponse);

        ProgressoResponse response = progressoService.save(progressoRequest, authentication);

        assertEquals(progressoResponse, response);
        verify(progressoRepository, times(1)).save(progresso);
    }

    @Test
    public void testGetProgresso() {
        when(progressoRepository.findById(1L)).thenReturn(Optional.of(progresso));
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        when(progressoMapper.toProgressoResponse(progresso)).thenReturn(progressoResponse);

        ProgressoResponse response = progressoService.getProgresso(1L, authentication);

        assertEquals(progressoResponse, response);
    }

    @Test
    public void testGetLastNProgressi() {
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        when(progressoRepository.findByCreator_UsernameOrderByDataMisurazioneDesc(eq(user.getUsername()), any(PageRequest.class)))
            .thenReturn(Optional.of(progressoList));
        when(progressoMapper.toProgressoResponse(progresso)).thenReturn(progressoResponse);

        List<ProgressoResponse> responses = progressoService.getLastNProgressi(1, authentication);

        assertFalse(responses.isEmpty());
        assertEquals(1, responses.size());
    }

    @Test
    public void testGetAllProgressi() {
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        when(progressoRepository.findByCreator_UsernameOrderByDataMisurazioneDesc(eq(user.getUsername()), any(Pageable.class)))
            .thenReturn(Optional.of(progressoList));
        when(progressoMapper.toProgressoResponse(progresso)).thenReturn(progressoResponse);

        List<ProgressoResponse> responses = progressoService.getAllProgressi(authentication);

        assertFalse(responses.isEmpty());
        assertEquals(1, responses.size());
    }

    @Test
    public void testGetAllProgressiPaginated() {
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        Page<Progresso> progressoPage = new PageImpl<>(progressoList, PageRequest.of(0, 1), 1);
        when(progressoRepository.findByCreator(any(Pageable.class), eq(user))).thenReturn(progressoPage);
        when(progressoMapper.toProgressoResponse(progresso)).thenReturn(progressoResponse);

        PageResponse<ProgressoResponse> pageResponse = progressoService.getAllProgressiPaginated(0, 1, authentication);

        assertNotNull(pageResponse);
        assertFalse(pageResponse.getContent().isEmpty());
        assertEquals(1, pageResponse.getTotalElements());
    }

    @Test
    public void testUpdateProgresso() {
        when(progressoRepository.findById(1L)).thenReturn(Optional.of(progresso));
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);

        progressoService.updateProgresso(1L, progressoRequest, authentication);

        verify(progressoRepository, times(1)).findById(1L);
    }

    @Test
    public void testDeleteById() {
        when(progressoRepository.findById(1L)).thenReturn(Optional.of(progresso));
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);

        progressoService.deleteById(1L, authentication);

        verify(progressoRepository, times(1)).delete(progresso);
    }
}



