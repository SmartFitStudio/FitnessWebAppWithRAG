package com.barutta02.FitnessApp.periodo_allenamento;

import java.util.ArrayList;
import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.barutta02.FitnessApp.user.User;

public interface PeriodoAllenamentoRepository extends JpaRepository<PeriodoAllenamento, Long> {
    Page<PeriodoAllenamento> findByPeriodo_IdAndPeriodo_Creator(Pageable pageable, Long id, User user); 
    Optional<ArrayList<PeriodoAllenamento>> findByPeriodo_IdAndPeriodo_Creator(Long Id,User user);

    void deleteByPeriodo_IdAndPeriodo_Creator(Long Id, User user);

    void deleteByIdAndPeriodo_Creator(Long Id, User user);
    
}