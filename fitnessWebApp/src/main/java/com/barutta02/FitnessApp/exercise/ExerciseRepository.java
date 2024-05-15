package com.barutta02.FitnessApp.exercise;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.barutta02.FitnessApp.user.User;
import java.util.List;


public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
        @Query("""
                SELECT exercise
                FROM Exercise exercise
                WHERE exercise.creator IS NULL OR exercise.creator.id = :userId
                """)
        Page<Exercise> findAllDisplayableExercise(Pageable pageable, int userId);

        Page<Exercise> findByCreator_Username(Pageable pageable, String username);

        Page<Exercise> findByCreatorNotAndShareableIsTrue(Pageable pageable, User user);

        Optional<Exercise> findByIdAndCreator(Long id, User creator);

        Optional<Exercise> findByName(String name);



        @Query("""
                SELECT exercise
                FROM Exercise exercise
                WHERE (exercise.creator IS NULL OR exercise.creator.username = :username) AND exercise.id = :id
                """)
        Optional<Exercise> findByIdAndCreator_UsernameOrDefault(Long id, String username);
}
