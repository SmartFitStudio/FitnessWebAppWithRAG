package com.barutta02.FitnessApp.exercise;

import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseRequest;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;
import com.barutta02.FitnessApp.file.FileStorageService;
import com.barutta02.FitnessApp.user.User;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.data.domain.*;

import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(org.mockito.junit.jupiter.MockitoExtension.class)
public class ExerciseServiceTest {

    @InjectMocks
    private ExerciseService exerciseService;

    @Mock
    private ExerciseRepository exerciseRepository;

    @Mock
    private ExerciseMapper exerciseMapper;

    @Mock
    private FileStorageService fileStorageService;

    @Mock
    private UserExtractor userExtractor;

    @Mock
    private Authentication authentication;

    private User user;
    private ExerciseRequest exerciseRequest;
    private ExerciseResponse exerciseResponse;
    private Exercise exercise;

    @BeforeEach
    public void setUp() {
        user = new User();
        user.setId(1);
        user.setUsername("testuser");

        exerciseRequest = mock(ExerciseRequest.class);
        exerciseResponse = mock(ExerciseResponse.class);
        exercise = new Exercise();

    }

    @Test
    public void testSave_Success() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        when(exerciseMapper.toExercise(any(ExerciseRequest.class), any(User.class))).thenReturn(exercise);
        when(exerciseRepository.save(any(Exercise.class))).thenReturn(exercise);
        when(exerciseMapper.toExerciseResponse(any(Exercise.class))).thenReturn(exerciseResponse);

        ExerciseResponse result = exerciseService.save(exerciseRequest, authentication);

        assertNotNull(result);
        verify(exerciseRepository, times(1)).save(exercise);
    }

    @Test
    public void testSave_ModifyExercise() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        exercise.setId(1L);

        Exercise oldExercise = new Exercise();
        oldExercise.setCover("oldCover");

        when(exerciseMapper.toExercise(any(ExerciseRequest.class), any(User.class))).thenReturn(exercise);
        when(exerciseRepository.findByIdAndCreator(anyLong(), any(User.class))).thenReturn(Optional.of(oldExercise));
        when(exerciseRepository.save(any(Exercise.class))).thenReturn(exercise);
        when(exerciseMapper.toExerciseResponse(any(Exercise.class))).thenReturn(exerciseResponse);

        ExerciseResponse result = exerciseService.save(exerciseRequest, authentication);

        assertNotNull(result);
        assertEquals("oldCover", exercise.getCover());
        verify(exerciseRepository, times(1)).save(exercise);
    }

    @Test
    public void testFindAuthenticatedUserOrDefaultExerciseById_Success() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        when(exerciseRepository.findByIdAndCreatorOrDefault(anyLong(), any(User.class))).thenReturn(Optional.of(exercise));
        when(exerciseMapper.toExerciseResponse(any(Exercise.class))).thenReturn(exerciseResponse);

        ExerciseResponse result = exerciseService.findAuthenticatedUserOrDefaultExerciseById(1L, authentication);

        assertNotNull(result);
        verify(exerciseRepository, times(1)).findByIdAndCreatorOrDefault(1L, user);
    }

    @Test
    public void testFindByIdAndCreatorOrDefault_creator_ThrowsEntityNotFoundException() {
        when(exerciseRepository.findByIdAndCreatorOrDefault(anyLong(), any(User.class))).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            exerciseService.findByIdAndCreatorOrDefault_creator(1L, user);
        });
    }

    @Test
    public void testFindAllAuthenticatedUserExercises_paginated() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        Page<Exercise> exercisesPage = new PageImpl<>(List.of(exercise));
        when(exerciseRepository.findByCreatorOrCreatorIsNull(any(Pageable.class), any(User.class))).thenReturn(exercisesPage);
        when(exerciseMapper.toExerciseResponse(any(Exercise.class))).thenReturn(exerciseResponse);

        PageResponse<ExerciseResponse> result = exerciseService.findAllAuthenticatedUserExercises_paginated(0, 10, authentication);

        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        verify(exerciseRepository, times(1)).findByCreatorOrCreatorIsNull(any(Pageable.class), eq(user));
    }

    @Test
    public void testFindAllAuthenticatedUserExercises_noPagination_Success() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        ArrayList<Exercise> exercisesList = List.of(exercise).stream().collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
        when(exerciseRepository.findByCreatorOrCreatorIsNull(any(User.class))).thenReturn(Optional.of(exercisesList));
        when(exerciseMapper.toExerciseResponse(any(Exercise.class))).thenReturn(exerciseResponse);

        ArrayList<ExerciseResponse> result = exerciseService.findAllAuthenticatedUserExercises_noPagination(authentication);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(exerciseRepository, times(1)).findByCreatorOrCreatorIsNull(eq(user));
    }

    @Test
    public void testFindAllAuthenticatedUserExercises_noPagination_ThrowsEntityNotFoundException() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        when(exerciseRepository.findByCreatorOrCreatorIsNull(any(User.class))).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            exerciseService.findAllAuthenticatedUserExercises_noPagination(authentication);
        });
    }

    @Test
    public void testImportExercise_Success() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);
        User anotUser = new User();
        Exercise existingExercise = new Exercise();
        existingExercise.setShareable(true);
        existingExercise.setName("Test Exercise");
        existingExercise.setDescription("Test Description");
        existingExercise.setCreator(anotUser);
        CategoryExercise[] categories = new CategoryExercise[]{CategoryExercise.ADDOME};
        existingExercise.setCategory(categories);
        when(exerciseRepository.findByIdAndCreatorNot(anyLong(), any())).thenReturn(Optional.of(existingExercise));
        when(exerciseRepository.save(any(Exercise.class))).thenReturn(exercise);
        when(exerciseMapper.toExerciseResponse(any(Exercise.class))).thenReturn(exerciseResponse);

        ExerciseResponse result = exerciseService.importExercise(1L, authentication);

        assertNotNull(result);
        verify(exerciseRepository, times(1)).save(any(Exercise.class));
    }

    @Test
    public void testImportExercise_NotShareable() {
        Exercise existingExercise = new Exercise();
        existingExercise.setShareable(false);


        assertThrows(Exception.class, () -> {
            exerciseService.importExercise(1L, authentication);
        });
    }

    @Test
    public void testDeleteById_Success() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);

        exerciseService.deleteById(1L, authentication);

        verify(exerciseRepository, times(1)).deleteByIdAndCreator(1L, user);
    }

    @Test
    public void testUploadExerciseCoverPicture_Success() {
        when(userExtractor.getUserFromAuthentication(any(Authentication.class))).thenReturn(user);
        User anotUser = new User();

        MultipartFile file = mock(MultipartFile.class);
        Exercise existingExercise = new Exercise();
        existingExercise.setId(1L);
        existingExercise.setName("Test Exercise");
        existingExercise.setDescription("Test Description");
        existingExercise.setCreator(anotUser);
        CategoryExercise[] categories = new CategoryExercise[]{CategoryExercise.ADDOME};
        existingExercise.setCategory(categories);

        when(exerciseRepository.findById(anyLong())).thenReturn(Optional.of(existingExercise));
        when(fileStorageService.saveFile(any(MultipartFile.class), anyLong(), anyInt())).thenReturn("newCoverPath");

        exerciseService.uploadExerciseCoverPicture(file, authentication, 1L);

        assertEquals("newCoverPath", existingExercise.getCover());
        verify(exerciseRepository, times(1)).save(existingExercise);
    }

}
