package com.barutta02.FitnessApp.periodo;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.barutta02.FitnessApp.user.User;

public interface PeriodoRepository extends JpaRepository<Periodo, Long> {

    Page<Periodo> findByCreator_Username(Pageable pageable, String username);

    Optional<Periodo> findByNameAndCreator_Username(String name,String username);
    Optional<Periodo> findByIdAndCreator_Username(Long id,String username);


    //mi serve per capire se esiste gia un periodo attivo per un utente
    boolean existsByCreatorAndAttivoIsTrue(User creator);

    Optional<Periodo> findByCreatorAndAttivoIsTrue(User creator);



}
