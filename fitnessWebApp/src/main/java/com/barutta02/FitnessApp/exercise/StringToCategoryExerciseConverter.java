package com.barutta02.FitnessApp.exercise;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class StringToCategoryExerciseConverter implements Converter<String, CategoryExercise> {

    @Override
    public CategoryExercise convert(String source) {
        try {
            return CategoryExercise.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            // Handle the exception or return a default value
            throw new RuntimeException("Invalid category: " + source, e);
        }
    }
}
