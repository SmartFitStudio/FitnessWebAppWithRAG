package com.barutta02.FitnessApp.exercise;

import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.common.Service_CRUD;
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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ExerciseService implements Service_CRUD<Exercise, Long, ExerciseRequest, ExerciseResponse> {

        private final ExerciseRepository exerciseRepository;
        private final ExerciseMapper exerciseMapper;
        private final FileStorageService fileStorageService;
        private final UserExtractor userExtractor;

        public ExerciseResponse save(ExerciseRequest request, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser); // Get the connected user from the
                                                                                    // Authentication object (Spring
                                                                                    // Security
                Exercise exercise = exerciseMapper.toExercise(request, user); // Convert the BookRequest object to a
                                                                              // Book object

                // Se stiamo facendo una modifica, controlla l'esercizio precedente e ottieni la
                // vecchia cover se questa è nulla, ovvero non ha richiesto modifica.
                if (exercise.getId() != null && exercise.getCover() == null) {
                        Exercise oldExercise = exerciseRepository.findByIdAndCreator(exercise.getId(), user)
                                        .orElseThrow(() -> new EntityNotFoundException(
                                                        "Stai modificando un esercizio inesistente:: "
                                                                        + exercise.getId()));
                        exercise.setCover(oldExercise.getCover());
                }
                return exerciseMapper.toExerciseResponse(exerciseRepository.save(exercise)); // Save the book in the
                                                                                             // database
                                                                                             // and return its ID
        }

        public ExerciseResponse findAuthenticatedUserOrDefaultExerciseById(Long exercise_id,
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                return exerciseMapper.toExerciseResponse(this.findByIdAndCreatorOrDefault_creator(exercise_id, user));
        }

        /*
         * Metodo per trovare un esercizio in base all'utente che lo ha oppure se è un
         * esercizio di default
         */
        public Exercise findByIdAndCreatorOrDefault_creator(Long exercise_id, User creator) {
                Exercise exercise = exerciseRepository.findByIdAndCreatorOrDefault(exercise_id, creator)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Non ci sono esercizi utilizzabili dall'utente con ID::"
                                                                + exercise_id));
                return exercise;
        }

        /**
         * Mostra tutti gli esercizi creati dall'utente autenticato, oltre a quelli di
         * default, ovvero che hanno creator nullo
         * 
         * @param page
         * @param size
         * @param connectedUser
         * @return
         */
        public PageResponse<ExerciseResponse> findAllAuthenticatedUserExercises_paginated(int page, int size,
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
                Page<Exercise> exercises = exerciseRepository.findByCreatorOrCreatorIsNull(pageable, user);
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

        public ArrayList<ExerciseResponse> findAllAuthenticatedUserExercises_noPagination(
                        Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                ArrayList<Exercise> exercises = exerciseRepository.findByCreatorOrCreatorIsNull(user)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Nessun esercizio associato a te è stato trovato"));
                return exercises.stream()
                                .map(exerciseMapper::toExerciseResponse)
                                .collect(Collectors.toCollection(ArrayList::new));
        }

        public PageResponse<ExerciseResponse> findAllImportableExercisesByCategories(int page, int size,
                        List<CategoryExercise> categories, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
                Stream<Exercise> exerciseStream = categories.stream()
                                .flatMap(category -> exerciseRepository
                                                .findAllImportableExercisesByCategory(pageable, category, user)
                                                .stream())
                                .distinct() // Efficiently remove duplicates based on object identity
                                .collect(Collectors.toSet()) // Collect into a Set for efficient duplicate handling
                                .stream(); // Convert back to a Stream if needed for further processing

                List<ExerciseResponse> exerciseResponseList = exerciseStream
                                .map(exercise -> exerciseMapper.toExerciseResponse(exercise))
                                .collect(Collectors.toList());
                Page<ExerciseResponse> exerciseResponsePage = new PageImpl<>(exerciseResponseList, pageable,
                                exerciseResponseList.size());
                return new PageResponse<>(
                                exerciseResponsePage.getContent(),
                                exerciseResponsePage.getNumber(),
                                exerciseResponsePage.getSize(),
                                exerciseResponsePage.getTotalElements(),
                                exerciseResponsePage.getTotalPages(),
                                exerciseResponsePage.isFirst(),
                                exerciseResponsePage.isLast());
        }

        public ExerciseResponse importExercise(Long exerciseId, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                log.info("User: " + user.getId() + " is importing exercise: " + exerciseId);
                Exercise exercise = exerciseRepository.findById(exerciseId)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "No exercise found with ID:: " + exerciseId));
                log.info("" + exercise.getCreator().getId());
                if (!exercise.isShareable()) {
                        throw new OperationNotPermittedException("You cannot import an exercise that is not shareable");
                }
                Exercise newExercise = Exercise.builder()
                                .name(exercise.getName())
                                .description(exercise.getDescription())
                                .cover(exercise.getCover())
                                .category(exercise.getCategory().clone())
                                .creator(user)
                                .shareable(false)
                                .build();
                return exerciseMapper.toExerciseResponse(exerciseRepository.save(newExercise));
        }

        public PageResponse<ExerciseResponse> findExerciseFromStore(int page, int size, Authentication connectedUser) {
                Page<Exercise> exercises = exerciseRepository.findByCreatorNotAndShareableIsTrue(
                                PageRequest.of(page, size, Sort.by("createdDate").descending()),
                                (User) connectedUser.getPrincipal());
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

        /*
         * This method is used to upload a book cover picture
         * It saves the file in the file system and updates the book cover field in the
         * database
         */
        public void uploadExerciseCoverPicture(MultipartFile file, Authentication connectedUser, Long exerciseId) {
                Exercise exercise = exerciseRepository.findById(exerciseId)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "No exercise found with ID:: " + exerciseId));
                User user = ((User) connectedUser.getPrincipal());
                var profilePicture = fileStorageService.saveFile(file, exerciseId, user.getId()); // per ogni utente
                                                                                                  // voglio
                                                                                                  // creare una cartella
                                                                                                  // dove
                                                                                                  // salvare i file
                exercise.setCover(profilePicture); // it is a string of the path of the file
                exerciseRepository.save(exercise);
        }

        public void deleteById(Long exercise_id, Authentication connectedUser) {
                User user = userExtractor.getUserFromAuthentication(connectedUser);
                exerciseRepository.deleteByIdAndCreator(exercise_id, user);
        }

}
