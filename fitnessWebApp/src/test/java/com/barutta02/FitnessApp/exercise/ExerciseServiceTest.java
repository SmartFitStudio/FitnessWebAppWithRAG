package com.barutta02.FitnessApp.exercise;

import com.barutta02.FitnessApp.exercise.DTO.ExerciseRequest;
import com.barutta02.FitnessApp.file.FileStorageService;
import com.barutta02.FitnessApp.user.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;

import static org.mockito.Mockito.*;

public class ExerciseServiceTest {

    @InjectMocks
    ExerciseService exerciseService;

    @Mock
    ExerciseRepository exerciseRepository;

    @Mock
    ExerciseMapper exerciseMapper;

    @Mock
    FileStorageService fileStorageService;

    @Mock
    Authentication connectedUser;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSave() {
        ExerciseRequest request = new ExerciseRequest(null, "Prova", "prova", null, true);
        User user = new User();
        Exercise exercise = new Exercise();

        when(connectedUser.getPrincipal()).thenReturn(user);
        when(exerciseMapper.toExercise(request, user)).thenReturn(exercise);
        when(exerciseRepository.save(exercise)).thenReturn(exercise);

        exerciseService.save(request, connectedUser);

        verify(exerciseRepository, times(1)).save(exercise);
    }
}