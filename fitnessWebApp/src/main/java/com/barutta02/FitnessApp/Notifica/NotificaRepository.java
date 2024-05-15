package com.barutta02.FitnessApp.Notifica;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.barutta02.FitnessApp.user.User;


public interface NotificaRepository  extends JpaRepository<Notifica, Long>{

    void deleteByCreatorAndDateNot(User user,LocalDate date);
    boolean existsByCreatorAndDate(User user,LocalDate date);
    Optional<ArrayList<Notifica>> findByCreatorAndDate(User user,LocalDate date);
}
