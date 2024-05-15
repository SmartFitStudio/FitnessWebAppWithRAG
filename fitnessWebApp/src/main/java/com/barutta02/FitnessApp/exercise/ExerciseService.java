package com.barutta02.FitnessApp.exercise;

import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseRequest;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;
import com.barutta02.FitnessApp.file.FileStorageService;

import com.barutta02.FitnessApp.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseMapper exerciseMapper;
    private final FileStorageService fileStorageService;
    private final UserExtractor userExtractor;

    public Long save(ExerciseRequest request, Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser); // Get the connected user from the
                                                                            // Authentication object (Spring Security
        Exercise exercise = exerciseMapper.toExercise(request, user); // Convert the BookRequest object to a Book object

        // Se stiamo facendo una modifica, controlla l'esercizio precedente e ottieni la
        // vecchia cover se questa è nulla, ovvero non ha richiesto modifica.
        if (exercise.getId() != null && exercise.getCover() == null) {
            Exercise oldExercise = exerciseRepository.findByIdAndCreator(exercise.getId(), user)
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Stai modificando un esercizio inesistente:: " + exercise.getId()));
            exercise.setCover(oldExercise.getCover());
        }
        return exerciseRepository.save(exercise).getId(); // Save the book in the database and return its ID
    }

    public ExerciseResponse findById(Long exercise_id) {
        return exerciseRepository.findById(exercise_id)
                .map(exerciseMapper::toExerciseResponse)
                .orElseThrow(() -> new EntityNotFoundException("No exercise found with ID:: " + exercise_id));
    }

    public PageResponse<ExerciseResponse> findAllExercise(int page, int size, Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Exercise> exercises = exerciseRepository.findAllDisplayableExercise(pageable, user.getId());
        List<ExerciseResponse> exercisesResponse = exercises.stream()
                .map(exerciseMapper::toExerciseResponse)
                .toList();
        return new PageResponse<>(
                exercisesResponse,
                exercises.getNumber(),
                exercises.getSize(),
                exercises.getTotalElements(),
                exercises.getTotalPages(),
                exercises.isFirst(),
                exercises.isLast());
    }

    
    public ExerciseResponse importExercise(Long exerciseId, Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new EntityNotFoundException("No exercise found with ID:: " + exerciseId));
        Exercise newExercise = Exercise.builder()
                .name(exercise.getName())
                .description(exercise.getDescription())
                .cover(exercise.getCover())
                .category(exercise.getCategory())
                .creator(user)
                .shareable(false)
                .build();
        return exerciseMapper.toExerciseResponse(exerciseRepository.save(newExercise));
    }

    public PageResponse<ExerciseResponse> findAllExerciseByCreator(int page, int size, Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Exercise> exercises = exerciseRepository.findByCreator_Username(pageable, user.getUsername());
        List<ExerciseResponse> exercisesResponses = exercises.stream()
                .map(exerciseMapper::toExerciseResponse)
                .toList();
        return new PageResponse<>(
                exercisesResponses,
                exercises.getNumber(),
                exercises.getSize(),
                exercises.getTotalElements(),
                exercises.getTotalPages(),
                exercises.isFirst(),
                exercises.isLast());
    }

    public void deleteExercise(Long exercise_id, Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        Exercise exercise = exerciseRepository.findById(exercise_id)
                .orElseThrow(() -> new EntityNotFoundException("No exercise found with ID:: " + exercise_id));
        if (!Objects.equals(exercise.getCreator().getId(), user.getId())) {
            throw new OperationNotPermittedException("You cannot delete an exercise you do not own");
        }
        exerciseRepository.delete(exercise);
    }

    public Exercise findById(Long exercise_id, String creator_username) {
        Exercise exercise = exerciseRepository.findById(exercise_id)
                .orElseThrow(() -> new EntityNotFoundException("No exercise found with ID dio bello:: " + exercise_id));
        if (exercise.getCreator() != null && !exercise.getCreator().getUsername().equals(creator_username)) {
            throw new OperationNotPermittedException("You cannot access an exercise you do not own");
        }
        return exercise;
    }

    public PageResponse<ExerciseResponse> findExerciseFromStore(int page, int size,Authentication connectedUser) {
        Page<Exercise> exercises = exerciseRepository.findByCreatorNotAndShareableIsTrue(PageRequest.of(page, size,Sort.by("createdDate").descending()), (User) connectedUser.getPrincipal());
        List<ExerciseResponse> exercisesResponses = exercises.stream()
              .map(exerciseMapper::toExerciseResponse)
              .toList();
      return new PageResponse<>(
              exercisesResponses,
              exercises.getNumber(),
              exercises.getSize(),
              exercises.getTotalElements(),
              exercises.getTotalPages(),
              exercises.isFirst(),
              exercises.isLast()
      );
    }

    /*
     * This method is used to upload a book cover picture
     * It saves the file in the file system and updates the book cover field in the
     * database
     */
    public void uploadExerciseCoverPicture(MultipartFile file, Authentication connectedUser, Long exerciseId) {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new EntityNotFoundException("No exercise found with ID:: " + exerciseId));
        User user = ((User) connectedUser.getPrincipal());
        var profilePicture = fileStorageService.saveFile(file, exerciseId, user.getId()); // per ogni utente voglio
                                                                                          // creare una cartella dove
                                                                                          // salvare i file
        exercise.setCover(profilePicture); // it is a string of the path of the file
        exerciseRepository.save(exercise);
    }

}
