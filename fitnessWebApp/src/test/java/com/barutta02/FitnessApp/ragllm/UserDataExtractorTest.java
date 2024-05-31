package com.barutta02.FitnessApp.ragllm;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;

import com.barutta02.FitnessApp.allenamento.AllenamentoService;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.allenamento_esercizio.AllenamentoEsercizioService;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioResponse;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exercise.CategoryExercise;
import com.barutta02.FitnessApp.exercise.ExerciseService;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;
import com.barutta02.FitnessApp.periodo.Obiettivo;
import com.barutta02.FitnessApp.periodo.PeriodoService;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoResponse;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoAllenamentoService;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoGiornata;
import com.barutta02.FitnessApp.periodo_allenamento.DTO.PeriodoAllenamentoResponse;
import com.barutta02.FitnessApp.progresso.ProgressoService;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoResponse;
import com.barutta02.FitnessApp.user.User;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;

public class UserDataExtractorTest {

    @Mock
    private UserExtractor userExtractor;

    @Mock
    private ProgressoService progressoService;

    @Mock
    private PeriodoService periodoService;

    @Mock
    private PeriodoAllenamentoService periodoAllenamentoService;

    @Mock
    private AllenamentoService allenamentoService;

    @Mock
    private AllenamentoEsercizioService allenamentoEsercizioService;

    @Mock
    private ExerciseService exerciseService;

    @Mock
    private Clock clock;

    @Mock
    private Authentication connectedUser;

    @InjectMocks
    private UserDataExtractor userDataExtractor;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        User user = new User();
        user.setUsername("testUser");
        user.setFirstname("Test");
        user.setLastname("User");
        user.setDateOfBirth(LocalDate.of(1990, 1, 1));
        when(userExtractor.getUserFromAuthentication(connectedUser)).thenReturn(user);
        Instant fixedInstant = LocalDate.of(2024, 5, 31).atStartOfDay(ZoneId.systemDefault()).toInstant();
        when(clock.instant()).thenReturn(fixedInstant);
        when(clock.getZone()).thenReturn(ZoneId.systemDefault());
    }

    @Test
    void testGetUserDataMinimalWithoutProgressiAndWithoutPeriodoAttivo() {
        when(progressoService.getLastNProgressi(5, connectedUser)).thenReturn(new ArrayList<>());
        when(periodoService.findAuthenticatedUserActivePeriodo(connectedUser)).thenReturn(null);
        String result = userDataExtractor.getUserDataMinimal(connectedUser);
        String expected = "Nome utente: testUser\n" +
                          "Nome e cognome: Test User\n" +
                          "Data di nascita: 1990-01-01\n" +
                          "Non ci sono misurazioni recenti per l'utente\n" +
                          "Al momento l'utente non ha alcun periodo attivo\n";
        assertEquals(expected, result);
    }

    @Test
    void testGetUserDataMinimalWithProgressiAndWithPeriodoAttivo() {
        ArrayList<ProgressoResponse> progressi = new ArrayList<>();
        ProgressoResponse progresso = new ProgressoResponse();
        progresso.setDataMisurazione(LocalDate.of(2023, 1, 1));
        progresso.setPesoKg(70);
        progresso.setAltezzaCm(175);
        progresso.setPercentualeMassaGrassa(15);
        progresso.setPercentualeMassaMuscolare(40);
        progressi.add(progresso);
        ProgressoResponse progresso2 = new ProgressoResponse();
        progresso2.setDataMisurazione(LocalDate.of(2023, 1, 5));
        progresso2.setPesoKg(70);
        progresso2.setAltezzaCm(175);
        progresso2.setPercentualeMassaGrassa(15);
        progresso2.setPercentualeMassaMuscolare(40);
        progresso2.setNote("Inizio programma di definizione");
        progressi.add(progresso2);
        when(progressoService.getLastNProgressi(5, connectedUser)).thenReturn(progressi);
        PeriodoResponse periodo = new PeriodoResponse();
        periodo.setName("Test Period");
        periodo.setObiettivo(Obiettivo.DEFINIZIONE);
        periodo.setDurata_in_giorni(30);
        periodo.setData_inizio(LocalDate.of(2023, 1, 1));
        periodo.setData_fine(LocalDate.of(2023, 1, 31));
        when(periodoService.findAuthenticatedUserActivePeriodo(connectedUser)).thenReturn(periodo);
        String result = userDataExtractor.getUserDataMinimal(connectedUser);
        String expected = "Nome utente: testUser\n" +
                          "Nome e cognome: Test User\n" +
                          "Data di nascita: 1990-01-01\n" +
                          "Ultime misurazioni dell'utente:\n" +
                          "1)\n" +
                          "Data misurazione: 2023-01-01\n" +
                          "Peso in kg: 70.0\n" +
                          "Altezza in cm: 175.0\n" +
                          "Percentuale massa grassa: 15.0\n" +
                          "Percentuale massa muscolare: 40.0\n" +
                          "Note: assenti\n" +
                          "2)\n" +
                          "Data misurazione: 2023-01-05\n" +
                          "Peso in kg: 70.0\n" +
                          "Altezza in cm: 175.0\n" +
                          "Percentuale massa grassa: 15.0\n" +
                          "Percentuale massa muscolare: 40.0\n" +
                          "Note: Inizio programma di definizione\n" +
                          "Periodo attivo dell'utente:\n" +
                          "Nome periodo: Test Period\n" +
                          "Obiettivo: DEFINIZIONE\n" +
                          "Durata in giorni del periodo (ovvero ogni quanti giorni si ripete il periodo): 30\n" +
                          "Data inizio: 2023-01-01\n" +
                          "Data fine: 2023-01-31\n" +
                          "Indice del giorno del periodo in cui ci si trova: 6\n";
        assertEquals(expected, result);
    }

    @Test
    void testGetUserDataCompleteWithoutAllenamenti(){
        when(progressoService.getLastNProgressi(5, connectedUser)).thenReturn(new ArrayList<>());
        PeriodoResponse periodo = new PeriodoResponse();
        periodo.setName("Test Period");
        periodo.setObiettivo(Obiettivo.DEFINIZIONE);
        periodo.setDurata_in_giorni(30);
        periodo.setData_inizio(LocalDate.of(2500, 1, 1));
        periodo.setData_fine(null);
        when(periodoService.findAuthenticatedUserActivePeriodo(connectedUser)).thenReturn(periodo);
        when(periodoAllenamentoService.findAllAuthUserPeriodoAllenamentoByPeriodoId_noPagination(periodo.getId(), connectedUser)).thenReturn(new ArrayList<>());
        String result = userDataExtractor.getUserDataComplete(connectedUser);
        String expected = "Nome utente: testUser\n" +
                          "Nome e cognome: Test User\n" +
                          "Data di nascita: 1990-01-01\n" +
                          "Non ci sono misurazioni recenti per l'utente\n" +
                          "Periodo attivo dell'utente:\n" +
                          "Nome periodo: Test Period\n" +
                          "Obiettivo: DEFINIZIONE\n" +
                          "Durata in giorni del periodo (ovvero ogni quanti giorni si ripete il periodo): 30\n" +
                          "Data inizio: 2500-01-01\n" +
                          "Data fine: non definita\n" +
                          "Indice del giorno del periodo in cui ci si trova: Il periodo deve ancora iniziare\n" +
                          "Non ci sono allenamenti associati al periodo attivo dell'utente\n";
        assertEquals(expected, result);
    }

    @Test
    void testGetUserDataCompleteWithAllenamenti(){
        when(progressoService.getLastNProgressi(5, connectedUser)).thenReturn(new ArrayList<>());
        PeriodoResponse periodo = new PeriodoResponse();
        periodo.setId(1L);
        periodo.setName("Test Period");
        periodo.setObiettivo(Obiettivo.DEFINIZIONE);
        periodo.setDurata_in_giorni(30);
        periodo.setData_inizio(LocalDate.of(2024, 1, 1));
        periodo.setData_fine(null);
        when(periodoService.findAuthenticatedUserActivePeriodo(connectedUser)).thenReturn(periodo);
        ArrayList<PeriodoAllenamentoResponse> allenamentiPeriodo = new ArrayList<>();
        PeriodoAllenamentoResponse allenamento1 = new PeriodoAllenamentoResponse();
        allenamento1.setId(1L);
        allenamento1.setId_allenamento(1L);
        allenamento1.setId_periodo(periodo.getId());
        allenamento1.setGiorno_del_periodo(0);
        allenamento1.setPeriodo_giornata(PeriodoGiornata.POMERIGGIO);
        allenamentiPeriodo.add(allenamento1);
        AllenamentoResponse allenamentoEntity1 = new AllenamentoResponse();
        allenamentoEntity1.setName("Allenamento 1");
        allenamentoEntity1.setDescription("Descrizione allenamento 1");
        allenamentoEntity1.setDurata_in_ore(1);
        when(allenamentoService.findByAuthUserAndAllenamentoId(1L, connectedUser)).thenReturn(allenamentoEntity1);
        when(allenamentoEsercizioService.findAllAuthUserAllenamentoEsercizioByAllenamentoId_noPagination(allenamento1.getId(), connectedUser)).thenReturn(new ArrayList<>());
        PeriodoAllenamentoResponse allenamento2 = new PeriodoAllenamentoResponse();
        allenamento2.setId(2L);
        allenamento2.setId_allenamento(2L);
        allenamento2.setId_periodo(periodo.getId());
        allenamento2.setGiorno_del_periodo(1);
        allenamento2.setPeriodo_giornata(PeriodoGiornata.MATTINA);
        allenamentiPeriodo.add(allenamento2);
        AllenamentoResponse allenamentoEntity2 = new AllenamentoResponse();
        allenamentoEntity2.setName("Allenamento 2");
        allenamentoEntity2.setDescription("Descrizione allenamento 2");
        allenamentoEntity2.setDurata_in_ore(2);
        when(allenamentoService.findByAuthUserAndAllenamentoId(2L, connectedUser)).thenReturn(allenamentoEntity2);
        AllenamentoEsercizioResponse esercizioAllenamento2 = new AllenamentoEsercizioResponse();
        esercizioAllenamento2.setId(1L);
        esercizioAllenamento2.setSerie(4);
        esercizioAllenamento2.setRipetizioni(10);
        esercizioAllenamento2.setIndex(0);
        esercizioAllenamento2.setRecupero(1);
        esercizioAllenamento2.setEsercizio_id(1L);
        when(allenamentoEsercizioService.findAllAuthUserAllenamentoEsercizioByAllenamentoId_noPagination(allenamento2.getId(), connectedUser)).thenReturn(new ArrayList<AllenamentoEsercizioResponse>(){{add(esercizioAllenamento2);}});
        ExerciseResponse exercise = new ExerciseResponse();
        exercise.setId(1L);
        exercise.setName("Squat");
        exercise.setDescription("Esercizio per gambe");
        exercise.setCategory(new CategoryExercise[]{CategoryExercise.QUADRICIPITI, CategoryExercise.FORZA});
        when(exerciseService.findAuthenticatedUserOrDefaultExerciseById(1L, connectedUser)).thenReturn(exercise);
        when(periodoAllenamentoService.findAllAuthUserPeriodoAllenamentoByPeriodoId_noPagination(periodo.getId(), connectedUser)).thenReturn(allenamentiPeriodo);
        String result = userDataExtractor.getUserDataComplete(connectedUser);
        String expected = "Nome utente: testUser\n" +
                          "Nome e cognome: Test User\n" +
                          "Data di nascita: 1990-01-01\n" +
                          "Non ci sono misurazioni recenti per l'utente\n" +
                          "Periodo attivo dell'utente:\n" +
                          "Nome periodo: Test Period\n" +
                          "Obiettivo: DEFINIZIONE\n" +
                          "Durata in giorni del periodo (ovvero ogni quanti giorni si ripete il periodo): 30\n" +
                          "Data inizio: 2024-01-01\n" +
                          "Data fine: non definita\n" +
                          "Indice del giorno del periodo in cui ci si trova: 1\n" +
                          "Allenamenti associati al periodo attivo:\n" +
                          "1)\n" +
                          "Nome allenamento: Allenamento 1\n" +
                          "Descrizione: Descrizione allenamento 1\n" +
                          "Durata in ore: 1.0\n" +
                          "Indice del giorno del periodo in cui viene eseguito: 0\n" +
                          "Periodo della giornata in cui viene eseguito: POMERIGGIO\n" +
                          "Non ci sono esercizi associati all'allenamento\n" +
                          "2)\n" +
                          "Nome allenamento: Allenamento 2\n" +
                          "Descrizione: Descrizione allenamento 2\n" +
                          "Durata in ore: 2.0\n" +
                          "Indice del giorno del periodo in cui viene eseguito: 1\n" +
                          "Periodo della giornata in cui viene eseguito: MATTINA\n" +
                          "Esercizi associati all'allenamento:\n" +
                          "2.1)\n" +
                          "Nome esercizio: Squat\n" +
                          "Descrizione: Esercizio per gambe\n" +
                          "Categorie a cui appartiene: \n" +
                          "-QUADRICIPITI\n" +
                          "-FORZA\n" +
                          "Numero serie: 4\n" +
                          "Numero ripetizioni: 10\n" +
                          "Tempo recupero in minuti: 1\n";
        assertEquals(expected, result);
    }

    @Test
    void testGetUserExercisesWithoutExercises() {
        when(exerciseService.findAllAuthenticatedUserExercises_noPagination(connectedUser)).thenReturn(new ArrayList<>());
        String result = userDataExtractor.getUserExercises(connectedUser);
        String expected = "Non ci sono esercizi disponibili per l'utente\n";
        assertEquals(expected, result);
    }

    @Test
    void testGetUserExercisesWithExercises() {
        ArrayList<ExerciseResponse> exercises = new ArrayList<>();
        ExerciseResponse exercise1 = new ExerciseResponse();
        exercise1.setId(1L);
        exercise1.setName("Squat");
        exercise1.setDescription("Esercizio per gambe");
        exercise1.setCategory(new CategoryExercise[]{CategoryExercise.QUADRICIPITI, CategoryExercise.FORZA});
        ExerciseResponse exercise2 = new ExerciseResponse();
        exercise2.setId(2L);
        exercise2.setName("Panca Piana");
        exercise2.setDescription("Esercizio per petto");
        exercise2.setCategory(new CategoryExercise[]{CategoryExercise.PETTORALI});
        exercises.add(exercise1);
        exercises.add(exercise2);
        when(exerciseService.findAllAuthenticatedUserExercises_noPagination(connectedUser)).thenReturn(exercises);
        String result = userDataExtractor.getUserExercises(connectedUser);
        String expected = "ID: 1\n" +
                          "Nome esercizio: Squat\n" +
                          "Descrizione: Esercizio per gambe\n" +
                          "Categorie a cui appartiene: \n" +
                          "-QUADRICIPITI\n" +
                          "-FORZA\n" +
                          "---\n" +
                          "ID: 2\n" +
                          "Nome esercizio: Panca Piana\n" +
                          "Descrizione: Esercizio per petto\n" +
                          "Categorie a cui appartiene: \n" +
                          "-PETTORALI\n" +
                          "---\n";
        assertEquals(expected, result);
    }

}