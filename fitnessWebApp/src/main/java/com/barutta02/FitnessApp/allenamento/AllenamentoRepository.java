package com.barutta02.FitnessApp.allenamento;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllenamentoRepository extends JpaRepository<Allenamento, Long> {

    Page<Allenamento> findByCreator_Username(Pageable pageable, String username);

    Optional<Allenamento> findByNameAndCreator_Username(String name,String username);
    Optional<Allenamento> findByIdAndCreator_Username(Long id,String username);


    Optional<ArrayList<Allenamento>> findByCreator_Username(String username);
}


