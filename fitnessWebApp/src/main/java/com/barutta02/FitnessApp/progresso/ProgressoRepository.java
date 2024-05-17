package com.barutta02.FitnessApp.progresso;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgressoRepository extends JpaRepository<Progresso, Long> {
    Optional<ArrayList<Progresso>> findByCreator_UsernameOrderByDataMisurazioneDesc(String username, Pageable pageable);
}


