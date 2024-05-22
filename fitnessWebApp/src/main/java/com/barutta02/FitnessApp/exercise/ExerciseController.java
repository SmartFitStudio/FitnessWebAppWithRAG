package com.barutta02.FitnessApp.exercise;

import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioResponse;
import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseRequest;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("exercises")
@RequiredArgsConstructor
@Tag(name = "Exercise")
public class ExerciseController {

    private final ExerciseService service;

    @PostMapping
    public ResponseEntity<ExerciseResponse> saveExercise(
            @Valid @RequestBody ExerciseRequest request,
            Authentication connectedUser // the connected user is passed as an argument
    ) {
        ExerciseResponse createdResource = service.save(request, connectedUser);
          URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                              .path("/{exercise-id}")
                                              .buildAndExpand(createdResource.getId())
                                              .toUri();
        return ResponseEntity.created(location).body(createdResource);
    }

    /*
     * Richiesta di importazione di un esercizio
     */
    @PostMapping("import/{exercise-id}")
    public ResponseEntity<ExerciseResponse> importExercise(
             @PathVariable("exercise-id") Long exerciseId,
            Authentication connectedUser 
    ) {
        return ResponseEntity.ok(service.importExercise(exerciseId, connectedUser));
    }


    @GetMapping("/{exercise-id}")
    public ResponseEntity<ExerciseResponse> findAuthenticatedUserOrDefaultExerciseById(
            @PathVariable("exercise-id") Long exerciseId,
            Authentication connectedUser ) {
        return ResponseEntity.ok(service.findAuthenticatedUserOrDefaultExerciseById(exerciseId, connectedUser));
    }

    /**
     * This method is used to get the list of exercise categories,
     * 
     * @return
     */
    @GetMapping("/exerciseCategories")
    public ResponseEntity<List<String>> getExerciseCategories() {
        List<String> valori = Arrays.stream(CategoryExercise.values())
                .map(CategoryExercise::toString)
                .collect(Collectors.toList());
        return ResponseEntity.ok(valori);
    }

    @GetMapping("/exercise-store")
    public ResponseEntity<PageResponse<ExerciseResponse>> getExercisesFromPublicStore(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findExerciseFromStore(page,size,connectedUser));
    }


    @GetMapping("/creator")
    public ResponseEntity<PageResponse<ExerciseResponse>> findAllAuthenticatedUserExercises_paginated(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findAllAuthenticatedUserExercises_paginated(page, size, connectedUser));
    }

    @GetMapping("/categories")
    public ResponseEntity<PageResponse<ExerciseResponse>> findExercisesByCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam List<CategoryExercise> categories,
            Authentication connectedUser
            ) {
        return ResponseEntity.ok(service.findAllImportableExercisesByCategories(page, size, categories, connectedUser));
    }

    /**
     * This method is used to upload a book cover picture
     * 
     * @param bookId
     * @param file
     * @param connectedUser
     * @return
     */
    @PostMapping(value = "/cover/{exercise-id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadBookCoverPicture(
            @PathVariable("exercise-id") Long exerciseId,
            @Parameter() @RequestPart("file") MultipartFile file,
            Authentication connectedUser) {
        service.uploadExerciseCoverPicture(file, connectedUser, exerciseId);
        return ResponseEntity.accepted().build();
    }

    @DeleteMapping("/{exercise-id}")
    public ResponseEntity<?> deleteExercise(
            @PathVariable("exercise-id") Long exerciseId,
            Authentication connectedUser) {
        service.deleteById(exerciseId, connectedUser);
        return ResponseEntity.noContent().build();
    }
}
