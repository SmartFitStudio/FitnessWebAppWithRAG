package com.barutta02.FitnessApp.exercise;

import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseRequest;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

@RestController
@RequestMapping("exercises")
@RequiredArgsConstructor
@Tag(name = "Exercise")
public class ExerciseController {

    private final ExerciseService service;

    @PostMapping
    public ResponseEntity<Long> saveExercise(
            @Valid @RequestBody ExerciseRequest request,
            Authentication connectedUser // the connected user is passed as an argument
    ) {
        return ResponseEntity.ok(service.save(request, connectedUser));
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
    public ResponseEntity<ExerciseResponse> findExerciseById(
            @PathVariable("exercise-id") Long exerciseId) {
        return ResponseEntity.ok(service.findById(exerciseId));
    }

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

    @DeleteMapping("/{exercise-id}")
    public ResponseEntity<?> deleteExercise(
            @PathVariable("exercise-id") Long exerciseId,
            Authentication connectedUser) {
        service.deleteExercise(exerciseId, connectedUser);
        return ResponseEntity.noContent().build();
    }

    /**
     * Page response is a custom class that contains the list of elements and the
     * total number of elements
     * Questo viene usato per evitare che sovraccarico se ci sono troppi elementi
     * 
     * @param page          firtst page by default
     * @param size          10 elements by default
     * @param connectedUser
     * @return
     */
    @GetMapping
    public ResponseEntity<PageResponse<ExerciseResponse>> findAllExercise(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findAllExercise(page, size, connectedUser));
    }

    @GetMapping("/creator")
    public ResponseEntity<PageResponse<ExerciseResponse>> findAllExerciseByCreator(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findAllExerciseByCreator(page, size, connectedUser));
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
            @PathVariable("exercise-id") Long bookId,
            @Parameter() @RequestPart("file") MultipartFile file,
            Authentication connectedUser) {
        service.uploadExerciseCoverPicture(file, connectedUser, bookId);
        return ResponseEntity.accepted().build();
    }
}
