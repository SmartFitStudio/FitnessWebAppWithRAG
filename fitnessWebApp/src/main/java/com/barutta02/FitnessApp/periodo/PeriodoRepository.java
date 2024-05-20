package com.barutta02.FitnessApp.periodo;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.barutta02.FitnessApp.user.User;

public interface PeriodoRepository extends JpaRepository<Periodo, Long> {

    Page<Periodo> findByCreator(Pageable pageable, User user);

    Optional<Periodo> findByIdAndCreator(Long id,User user);

    //mi serve per capire se esiste gia un periodo attivo per un utente
    boolean existsByCreatorAndAttivoIsTrue(User creator);

    Optional<Periodo> findByCreatorAndAttivoIsTrue(User creator);

    void deleteByIdAndCreator(Long id, User creator);

}
