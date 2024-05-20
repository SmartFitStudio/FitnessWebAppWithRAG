package com.barutta02.FitnessApp.exercise;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.barutta02.FitnessApp.user.User;
import java.util.List;


public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

        Page<Exercise> findByCreatorOrCreatorIsNull(Pageable pageable, User user);

        Page<Exercise> findByCreator(Pageable pageable, User user);

        Page<Exercise> findByCreatorNotAndShareableIsTrue(Pageable pageable, User user);

        Optional<Exercise> findByIdAndCreator(Long id, User creator);

        Optional<Exercise> findByName(String name);

        @Query("""
                SELECT exercise
                FROM Exercise exercise
                WHERE (exercise.creator IS NULL OR exercise.creator = :user) AND exercise.id = :id
                """)
        Optional<Exercise> findByIdAndCreatorOrDefault(Long id, User user);

        void deleteByIdAndCreator(Long id, User creator);
}
