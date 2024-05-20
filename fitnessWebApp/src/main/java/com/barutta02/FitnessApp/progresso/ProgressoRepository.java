package com.barutta02.FitnessApp.progresso;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.barutta02.FitnessApp.exercise.Exercise;
import com.barutta02.FitnessApp.user.User;

public interface ProgressoRepository extends JpaRepository<Progresso, Long> {
    Optional<ArrayList<Progresso>> findByCreator_UsernameOrderByDataMisurazioneDesc(String username, Pageable pageable);

    Page<Progresso> findByCreator(Pageable pageable, User user);

}
