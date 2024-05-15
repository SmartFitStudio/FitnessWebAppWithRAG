package com.barutta02.FitnessApp.periodo_allenamento;

import java.util.ArrayList;
import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PeriodoAllenamentoRepository extends JpaRepository<PeriodoAllenamento, Long> {
    Page<PeriodoAllenamento> findByPeriodo_NameAndPeriodo_Creator_Username(Pageable pageable, String name, String username); 
    Optional<ArrayList<PeriodoAllenamento>> findByPeriodo_NameAndPeriodo_Creator_Username(String name,String username);
    Optional<ArrayList<PeriodoAllenamento>> findByPeriodo_IdAndPeriodo_Creator_Username(Long Id,String username);

    void deleteByPeriodo_NameAndPeriodo_Creator_Username(String name, String username);
    void deleteByPeriodo_IdAndPeriodo_Creator_Username(Long Id, String username);

    void deleteByIdAndPeriodo_Creator_Username(Long Id, String username);
    
}