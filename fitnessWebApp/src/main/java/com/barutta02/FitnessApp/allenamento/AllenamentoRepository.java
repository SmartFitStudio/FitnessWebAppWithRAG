package com.barutta02.FitnessApp.allenamento;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.barutta02.FitnessApp.user.User;

public interface AllenamentoRepository extends JpaRepository<Allenamento, Long> {

    Page<Allenamento> findByCreator(Pageable pageable, User user);

    Optional<Allenamento> findByNameAndCreator(String name,User user);
    Optional<Allenamento> findByIdAndCreator(Long id,User user);
    Optional<ArrayList<Allenamento>> findByCreator(User user);

    void deleteByIdAndCreator(Long id, User user);
}


