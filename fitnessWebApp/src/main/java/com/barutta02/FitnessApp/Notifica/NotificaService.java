package com.barutta02.FitnessApp.Notifica;

import com.barutta02.FitnessApp.Notifica.DTO.NotificaResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exception.OperationNotPermittedException;
import com.barutta02.FitnessApp.periodo.Periodo;
import com.barutta02.FitnessApp.periodo.PeriodoRepository;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoAllenamento;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoAllenamentoRepository;
import com.barutta02.FitnessApp.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;

import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class NotificaService {

    private final NotificaRepository notificaRepository;
    private final PeriodoRepository periodoRepository;
    private final PeriodoAllenamentoRepository periodoAllenamentoRepository;
    private final NotificaMapper notificaMapper;
    private final UserExtractor userExtractor;

    private static final String MESSAGE_TEMPLATE = "Hai un evento in programma per oggi {{PeriodoGiornata}}";

    public ArrayList<NotificaResponse> getTodaysNotifications(Authentication connectedUser) {
        // Delete old notifications
        this.deleteOldNotifications(userExtractor.getUserFromAuthentication(connectedUser), LocalDate.now());
        User user = userExtractor.getUserFromAuthentication(connectedUser);

        if (isThereAnyNotificationForToday(user, LocalDate.now())) {
            log.info("Notifiche già presenti per oggi");
            Optional<ArrayList<Notifica>> notifiche = notificaRepository.findByCreatorAndDate(user, LocalDate.now());
            if (notifiche.isPresent()) {
                return notifiche.get().stream().map(notificaMapper::toNotificaResponse)
                        .collect(Collectors.toCollection(ArrayList::new));
            }
        } else {
            Periodo periodoAttivo = periodoRepository.findByCreatorAndAttivoIsTrue(user)
                    .orElse(null);
                    if(periodoAttivo != null){
                        ArrayList<PeriodoAllenamento> allenamenti = periodoAllenamentoRepository
                        .findByPeriodo_IdAndPeriodo_Creator(periodoAttivo.getId(), user)
                        .orElse(null);
                return generateTodayNotifications(periodoAttivo, allenamenti).stream()
                        .map(notificaMapper::toNotificaResponse)
                        .collect(Collectors.toCollection(ArrayList::new));
                    }
        }
        return null;

    }

    /**
     * Generate notifications for today
     * 
     * @param periodo
     * @param allenamenti
     * @return
     */
    private ArrayList<Notifica> generateTodayNotifications(Periodo periodo, ArrayList<PeriodoAllenamento> allenamenti) {
        ArrayList<Notifica> notifiche = new ArrayList<>();
        LocalDate today = LocalDate.now(); // Attenzione UTC
        log.info(today.toString());
        LocalDate lastAllenamentoDate = periodo.getData_inizio();
        int iterator = 0;
        while ((lastAllenamentoDate.isBefore(today) || lastAllenamentoDate.isEqual(today)) && iterator < 100) {
            for (int i = 0; i < allenamenti.size(); i++) {
                lastAllenamentoDate = periodo.getData_inizio().plusDays(
                        allenamenti.get(i).getGiorno_del_periodo() + (iterator * periodo.getDurata_in_giorni()));
                log.info(lastAllenamentoDate.toString());
                if (lastAllenamentoDate.isEqual(today)) {
                    Notifica notifica = new Notifica();
                    notifica.setCreator(periodo.getCreator());
                    notifica.setDate(today);
                    notifica.setTitle(allenamenti.get(i).getAllenamento().getName());
                    notifica.setMessage(MESSAGE_TEMPLATE.replace("{{PeriodoGiornata}}", allenamenti.get(i).getPeriodo_giornata().toString()));
                    notifica.setRead(false);
                    notifiche.add(notifica);
                    this.notificaRepository.save(notifica);
                }
            }
            iterator++;
        }
        return notifiche;
    }

    /**
     * Check if there are notifications for today already generated
     * @param user
     * @param today
     * @return
     */
    private boolean isThereAnyNotificationForToday(User user, LocalDate today) {
        return notificaRepository.existsByCreatorAndDate(user, today);
    }

    /**
     * Delete old notifications that are not for today
     * @param user
     * @param today
     */
    private void deleteOldNotifications(User user, LocalDate today) {
        notificaRepository.deleteByCreatorAndDateNot(user, today);
    }

    /**
     * Set a notification as read
     * @param notification_id
     * @param connectedUser
     */
    public NotificaResponse setNotificationAsRead(Long notification_id, Authentication connectedUser) {
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        Notifica notifica = notificaRepository.findById(notification_id)
                .orElseThrow(() -> new EntityNotFoundException("Nessuna notifica trovata con ID:: " + notification_id));
        if (!Objects.equals(notifica.getCreator().getId(), user.getId())) {
            throw new OperationNotPermittedException("Non puoi segnare come letta una notifica che non ti appartiene");
        }
        notifica.setRead(true);
        return notificaMapper.toNotificaResponse(notificaRepository.save(notifica));
    }

}
