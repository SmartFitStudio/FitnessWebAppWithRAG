package com.barutta02.FitnessApp.ragllm;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.barutta02.FitnessApp.allenamento.AllenamentoService;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.allenamento_esercizio.AllenamentoEsercizioService;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exercise.ExerciseService;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;
import com.barutta02.FitnessApp.periodo.PeriodoService;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoResponse;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoAllenamentoService;
import com.barutta02.FitnessApp.periodo_allenamento.DTO.PeriodoAllenamentoResponse;
import com.barutta02.FitnessApp.progresso.ProgressoService;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoResponse;
import com.barutta02.FitnessApp.ragllm.DTO.Question;
import com.barutta02.FitnessApp.ragllm.DTO.RagllmRequest;
import com.barutta02.FitnessApp.ragllm.DTO.RagllmResponse;
import com.barutta02.FitnessApp.user.User;

import lombok.AllArgsConstructor;

import java.time.temporal.ChronoUnit;
import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.security.core.Authentication;
import org.springframework.http.MediaType;
import reactor.core.publisher.Mono;


@Service
@AllArgsConstructor
public class RagllmService {

    private final WebClient webClient;
    private final UserExtractor userExtractor;
    private final ProgressoService progressoService;
    private final PeriodoService periodoService;
    private final PeriodoAllenamentoService periodoAllenamentoService;
    private final AllenamentoService allenamentoService;
    private final AllenamentoEsercizioService allenamentoEsercizioService;
    private final ExerciseService exerciseService;

    private String defineUserDataForRag(Authentication connectedUser){
        User user = userExtractor.getUserFromAuthentication(connectedUser);
        String user_data = "Nome utente: " + user.getUsername() + "\n" +
                           "Nome e cognome: " + user.getFullName() + "\n" +
                           "Data di nascita: " + user.getDateOfBirth() + "\n";
        ArrayList<ProgressoResponse> progressi = progressoService.getLastNProgressi(5, connectedUser);
        if(progressi.isEmpty()) {
            user_data += "Non ci sono misurazioni recenti per l'utente\n";
        } else {
            user_data += "Ultime misurazioni dell'utente:\n";
            int numero_misurazione = 1;
            for (ProgressoResponse progresso : progressi) {
                user_data += numero_misurazione + ")\n" +
                             "Data misurazione: " + progresso.getDataMisurazione() + "\n" +
                             "Peso in kg: " + progresso.getPesoKg() + "\n" +
                             "Altezza in cm: " + progresso.getAltezzaCm() + "\n" +
                             "Percentuale massa grassa: " + progresso.getPercentualeMassaGrassa() + "\n" +
                             "Percentuale massa magra: " + progresso.getPercentualeMassaMagra() + "\n" +
                             "Note: " + (progresso.getNote()!=null && !progresso.getNote().isEmpty()?progresso.getNote():"assenti") + "\n";
                numero_misurazione++;
            }
        }
        PeriodoResponse periodoAttivo = periodoService.findAuthenticatedUserActivePeriodo(connectedUser);
        if(periodoAttivo == null) {
            user_data += "Al momento l'utente non ha alcun periodo attivo\n";
        } else {
            Long giorni_trascorsi_da_inizio_periodo = ChronoUnit.DAYS.between(periodoAttivo.getData_inizio(), LocalDate.now());
            user_data += "Periodo attivo dell'utente:\n" +
                         "Nome periodo: " + periodoAttivo.getName() + "\n" +
                         "Obiettivo: " + periodoAttivo.getObiettivo() + "\n" +
                         "Durata in giorni del periodo (ovvero ogni quanti giorni si ripete il periodo): " + periodoAttivo.getDurata_in_giorni() + "\n" +
                         "Data inizio: " + periodoAttivo.getData_inizio() + "\n" +
                         "Data fine: " + (periodoAttivo.getData_fine()!=null?periodoAttivo.getData_fine():"non definita") + "\n" +
                         "Indice del giorno del periodo in cui ci si trova: " + (giorni_trascorsi_da_inizio_periodo>=0?giorni_trascorsi_da_inizio_periodo%periodoAttivo.getDurata_in_giorni():"Il periodo deve ancora iniziare") + "\n";
            ArrayList<PeriodoAllenamentoResponse> allenamentiPeriodoAttivo = periodoAllenamentoService.findAllAuthUserPeriodoAllenamentoByPeriodoId_noPagination(periodoAttivo.getId(), connectedUser);
            if(allenamentiPeriodoAttivo.isEmpty()) {
                user_data += "Non ci sono allenamenti associati al periodo attivo dell'utente\n";
            } else {
                user_data += "Allenamenti associati al periodo attivo:\n";
                int numero_allenamento = 1;
                for (PeriodoAllenamentoResponse allenamento : allenamentiPeriodoAttivo) {
                    AllenamentoResponse allenamentoEntity = allenamentoService.findByAuthUserAndAllenamentoId(allenamento.getId_allenamento(), connectedUser);
                    user_data += numero_allenamento + ")\n" +
                                 "Nome allenamento: " + allenamentoEntity.getName() + "\n" +
                                 "Descrizione: " + allenamentoEntity.getDescription() + "\n" +
                                 "Durata in ore: " + allenamentoEntity.getDurata_in_ore() + "\n";
                    user_data += "Indice del giorno del periodo in cui viene eseguito: " + allenamento.getGiorno_del_periodo() + "\n" +
                                 "Periodo della giornata in cui viene eseguito: " + allenamento.getPeriodo_giornata() + "\n";
                    ArrayList<AllenamentoEsercizioResponse> eserciziAllenamento = allenamentoEsercizioService.findAllAuthUserAllenamentoEsercizioByAllenamentoId_noPagination(allenamento.getId_allenamento(), connectedUser);
                    if(eserciziAllenamento.isEmpty()) {
                        user_data += "Non ci sono esercizi associati all'allenamento\n";
                    } else {
                        user_data += "Esercizi associati all'allenamento:\n";
                        int numero_esercizio = 1;
                        for (AllenamentoEsercizioResponse esercizio : eserciziAllenamento) {
                            ExerciseResponse esercizioEntity = exerciseService.findAuthenticatedUserOrDefaultExerciseById(esercizio.getEsercizio_id(), connectedUser);
                            user_data += numero_allenamento + "." + numero_esercizio + ")\n" +
                                         "Nome esercizio: " + esercizioEntity.getName() + "\n" +
                                         "Descrizione: " + esercizioEntity.getDescription() + "\n" +
                                         "Categorie a cui appartiene: " + "\n";
                            for(int i = 0; i < esercizioEntity.getCategory().length; i++) {
                                user_data += "-" + esercizioEntity.getCategory()[i] + "\n";
                            } 
                            user_data += "Numero serie: " + esercizio.getSerie() + "\n" +
                                         "Numero ripetizioni: " + esercizio.getRipetizioni()+ "\n" +
                                         "Tempo recupero in minuti: " + esercizio.getRecupero() + "\n";
                            numero_esercizio++;
                        }
                    }
                    numero_allenamento++;
                }
            }
        }

        return user_data;
    }

    public Mono<RagllmResponse> answerQuestion(Question question, Authentication connectedUser) {
        RagllmRequest request = new RagllmRequest(question.question(), defineUserDataForRag(connectedUser));
        return webClient.post()
                .uri("/answer")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(RagllmResponse.class);
    }
}
