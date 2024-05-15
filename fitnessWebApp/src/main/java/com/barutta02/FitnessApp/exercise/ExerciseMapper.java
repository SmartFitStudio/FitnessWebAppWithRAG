package com.barutta02.FitnessApp.exercise;

import org.springframework.stereotype.Service;

import com.barutta02.FitnessApp.exercise.DTO.ExerciseRequest;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;
import com.barutta02.FitnessApp.file.FileUtils;
import com.barutta02.FitnessApp.user.User;

@Service
public class ExerciseMapper {
    public Exercise toExercise(ExerciseRequest request, User creator) {
        return Exercise.builder()
                .id(request.id())
                .name(request.name())
                .description(request.description())
                .category(request.category())
                .creator(creator)
                .shareable(request.shareable())
                .build();
    }

    public ExerciseResponse toExerciseResponse(Exercise exercise) {
        return ExerciseResponse.builder()
            .id(exercise.getId())
            .name(exercise.getName())
            .description(exercise.getDescription())
            .creator_username(exercise.getCreator() != null ? exercise.getCreator().getUsername() : "default")
            .cover(FileUtils.readFileFromLocation(exercise.getCover()))
            .category(exercise.getCategory())
            .shareable(exercise.isShareable())
            .build();
    }
}
