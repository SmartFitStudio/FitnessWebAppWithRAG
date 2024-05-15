package com.barutta02.FitnessApp.exercise.DTO;

import com.barutta02.FitnessApp.exercise.CategoryExercise;

import jakarta.validation.constraints.NotEmpty;

import jakarta.validation.constraints.NotNull;

public record ExerciseRequest( 
    Long id,

    @NotNull(message = "Il nome dell'esercizio è necessario") // Exercise name is mandatory, if not provided, return error code 100
    @NotEmpty(message = "Il nome dell'esercizio è necessario")
    String name,
    @NotNull(message = "La descrizione dell'esercizio è necessario") // Exercise name is mandatory, if not provided, return error code 100
    String description,
    CategoryExercise[] category,
    boolean shareable

) {}

