package com.barutta02.FitnessApp.config;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.barutta02.FitnessApp.user.User;

import java.util.Optional;

/*
 * This class is used to keep track of the user who created or modified an entity
 AuditorAware è un'interfaccia fornita da Spring Data che viene utilizzata per ottenere informazioni sull'utente che ha effettuato un'operazione su un'entità. Questo è comunemente utilizzato per tenere traccia delle informazioni sull'utente che ha creato o modificato un record nel database, ad esempio la data e l'ora di creazione o modifica e l'identificatore dell'utente che ha eseguito l'operazione.

 T è il tipo dell'identificatore dell'utente, ad esempio Integer o String.
 */
public class ApplicationAuditAware implements AuditorAware<Integer> {
    /*
     * This method is used to get the current user who is performing an operation on an entity.
     */
    @Override
    public Optional<Integer> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken) {
            return Optional.empty();
        }

        User userPrincipal = (User) authentication.getPrincipal();

        return Optional.ofNullable(userPrincipal.getId());
    }
}
