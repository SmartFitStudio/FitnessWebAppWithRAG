package com.barutta02.FitnessApp.custumValidator;


import com.barutta02.FitnessApp.exercise.CategoryExercise;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CategoryValidator implements ConstraintValidator<ValidCategory, CategoryExercise> {

    @Override
    public void initialize(ValidCategory constraintAnnotation) {
    }

    @Override
    public boolean isValid(CategoryExercise category, ConstraintValidatorContext context) {
        if (category == null) {
            System.err.println("Category is null or empty");
            return false;
        }

        for (CategoryExercise validCategory : CategoryExercise.values()) {
            if (validCategory == category) {
                return true;
            }
        }

        return false;
    }
}