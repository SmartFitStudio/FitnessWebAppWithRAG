package com.barutta02.FitnessApp.exercise.DTO;

import com.barutta02.FitnessApp.exercise.CategoryExercise;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExerciseResponse {
    @NotNull(message = "L'id dell'esercizio è necessario")
    private Long id;
    @NotNull(message = "Il nome dell'esercizio è necessario")
    private String name;
    @NotNull(message = "La descrizione dell'esercizio è necessaria")
    private String description;
    
    private String creator_username;
    private CategoryExercise[] category;
    private byte[] cover;
    @NotNull(message = "E' necessario specificare se l'esercizio è condivisibile")
    private boolean shareable;
}
