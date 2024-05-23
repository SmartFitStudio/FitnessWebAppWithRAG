package com.barutta02.FitnessApp.allenamento;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoRequest;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.Mockito.*;

public class AllenamentoServiceTest {

    @InjectMocks
    AllenamentoService allenamentoService;

    @Mock
    AllenamentoRepository allenamentoRepository;

    @Mock
    AllenamentoMapper allenamentoMapper;

    @Mock
    UserExtractor userExtractor;

    @Mock
    Authentication connectedUser;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSave() {
        AllenamentoRequest request = new AllenamentoRequest(null, null, null, 0);
        User user = new User();
        Allenamento allenamento = new Allenamento();
        AllenamentoResponse response = new AllenamentoResponse();

        when(userExtractor.getUserFromAuthentication(connectedUser)).thenReturn(user);
        when(allenamentoMapper.toAllenamento(request, user)).thenReturn(allenamento);
        when(allenamentoRepository.save(allenamento)).thenReturn(allenamento);
        when(allenamentoMapper.toAllenamentoResponse(allenamento)).thenReturn(response);

        allenamentoService.save(request, connectedUser);

        verify(allenamentoRepository, times(1)).save(allenamento);
    }

    @Test
    public void testFindByAuthUserAndAllenamentoId() {
        Long id = 1L;
        User user = new User();
        Allenamento allenamento = new Allenamento();
        AllenamentoResponse response = new AllenamentoResponse();

        when(userExtractor.getUserFromAuthentication(connectedUser)).thenReturn(user);
        when(allenamentoRepository.findByIdAndCreator(id, user)).thenReturn(Optional.of(allenamento));
        when(allenamentoMapper.toAllenamentoResponse(allenamento)).thenReturn(response);

        allenamentoService.findByAuthUserAndAllenamentoId(id, connectedUser);

        verify(allenamentoRepository, times(1)).findByIdAndCreator(id, user);
    }

    @Test
    public void testFindAllAuthUserAllenamento_noPagination() {
        User user = new User();
        ArrayList<Allenamento> allenamenti = new ArrayList<>();

        when(userExtractor.getUserFromAuthentication(connectedUser)).thenReturn(user);
        when(allenamentoRepository.findByCreator(user)).thenReturn(Optional.of(allenamenti));

        allenamentoService.findAllAuthUserAllenamento_noPagination(connectedUser);

        verify(allenamentoRepository, times(1)).findByCreator(user);
    }

    @Test
    public void testDeleteById() {
        Long id = 1L;
        User user = new User();

        when(userExtractor.getUserFromAuthentication(connectedUser)).thenReturn(user);

        allenamentoService.deleteById(id, connectedUser);

        verify(allenamentoRepository, times(1)).deleteByIdAndCreator(id, user);
    }
}