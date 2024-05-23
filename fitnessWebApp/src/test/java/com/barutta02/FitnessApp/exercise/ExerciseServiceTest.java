package com.barutta02.FitnessApp.exercise;

import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exercise.*;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseRequest;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;
import com.barutta02.FitnessApp.file.FileStorageService;
import com.barutta02.FitnessApp.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

class ExerciseServiceTest {

    @Mock
    private ExerciseRepository exerciseRepository;

    @Mock
    private ExerciseMapper exerciseMapper;

    @Mock
    private FileStorageService fileStorageService;

    @Mock
    private UserExtractor userExtractor;

    @InjectMocks
    private ExerciseService exerciseService;

    @SuppressWarnings("deprecation")
    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void saveExerciseTest() {
        ExerciseRequest request = new ExerciseRequest((long) 1, "null", "null", null, false);
        Authentication authentication = mock(Authentication.class);
        User user = new User();
        Exercise exercise = new Exercise();
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        when(exerciseMapper.toExercise(request, user)).thenReturn(exercise);
        when(exerciseRepository.save(exercise)).thenReturn(exercise);
        ExerciseResponse response = exerciseService.save(request, authentication);
        assertEquals(exerciseMapper.toExerciseResponse(exercise), response);
        verify(exerciseRepository, times(1)).save(exercise);
    }

    @Test
    void getExerciseByIdTest() {
        Long id = 1L;
        Authentication authentication = mock(Authentication.class);
        User user = new User();
        Exercise exercise = new Exercise();
        when(userExtractor.getUserFromAuthentication(authentication)).thenReturn(user);
        when(exerciseRepository.findByIdAndCreatorOrDefault(id, user)).thenReturn(Optional.of(exercise));
        ExerciseResponse response = exerciseMapper
                .toExerciseResponse(exerciseService.findByIdAndCreatorOrDefault_creator(id, user));
        assertEquals(exerciseMapper.toExerciseResponse(exercise), response);
        verify(exerciseRepository, times(1)).findByIdAndCreatorOrDefault(id, user);
    }

        @Test
    void testFindAuthenticatedUserOrDefaultExerciseById() {
        Exercise exercise = new Exercise();
        when(exerciseRepository.findByIdAndCreatorOrDefault(anyLong(), any())).thenReturn(Optional.of(exercise));
        when(exerciseMapper.toExerciseResponse(exercise)).thenReturn(new ExerciseResponse());
        ExerciseResponse result = exerciseService.findAuthenticatedUserOrDefaultExerciseById(1L, mock(Authentication.class));
        assertEquals(exerciseMapper.toExerciseResponse(exercise), result);
    }

}
