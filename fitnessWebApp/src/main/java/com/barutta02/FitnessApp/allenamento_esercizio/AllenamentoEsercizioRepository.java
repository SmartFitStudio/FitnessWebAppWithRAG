package com.barutta02.FitnessApp.allenamento_esercizio;

import java.util.ArrayList;
import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllenamentoEsercizioRepository extends JpaRepository<AllenamentoEsercizio, Long> {

    Page<AllenamentoEsercizio> findByAllenamento_NameAndAllenamento_Creator_Username(Pageable pageable, String name, String username);

    Optional<ArrayList<AllenamentoEsercizio>> findByAllenamento_NameAndAllenamento_Creator_Username(String name,String username);
    Optional<ArrayList<AllenamentoEsercizio>> findByAllenamento_IdAndAllenamento_Creator_Username(Long Id,String username);

    void deleteByAllenamento_NameAndAllenamento_Creator_Username(String name, String username);
    void deleteByAllenamento_IdAndAllenamento_Creator_Username(Long Id, String username);
}
