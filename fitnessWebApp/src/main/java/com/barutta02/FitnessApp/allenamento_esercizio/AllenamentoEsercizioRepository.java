package com.barutta02.FitnessApp.allenamento_esercizio;

import java.util.ArrayList;
import java.util.Optional;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.barutta02.FitnessApp.user.User;

public interface AllenamentoEsercizioRepository extends JpaRepository<AllenamentoEsercizio, Long> {

    //importante che rimanga anche la ricerca per utente per evitare che un utente possa vedere gli allenamenti di un altro utente
    Page<AllenamentoEsercizio> findByAllenamento_IdAndAllenamento_Creator(Pageable pageable, Long id, User user);

    Optional<ArrayList<AllenamentoEsercizio>> findByAllenamento_IdAndAllenamento_Creator(Long Id,User user);

    void deleteByAllenamento_IdAndAllenamento_Creator(Long Id, User user);
    void deleteByIdAndAllenamento_Creator(Long Id, User user);
}
