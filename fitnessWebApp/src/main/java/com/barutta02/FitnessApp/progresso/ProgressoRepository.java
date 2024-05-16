package com.barutta02.FitnessApp.progresso;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProgressoRepository extends JpaRepository<Progresso, Long> {

    Optional<Progresso> findByIdAndCreator_Username(Long id, String username);
    Optional<Progresso> findByData_misurazioneAndCreator_Username(Date data_misurazione, String username);
    Optional<ArrayList<Progresso>> findByCreator_Username(String username);
}


