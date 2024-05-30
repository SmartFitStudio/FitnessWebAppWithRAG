package com.barutta02.FitnessApp.ragllm;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;

import com.barutta02.FitnessApp.allenamento.AllenamentoService;
import com.barutta02.FitnessApp.allenamento_esercizio.AllenamentoEsercizioService;
import com.barutta02.FitnessApp.config.UserExtractor;
import com.barutta02.FitnessApp.exercise.CategoryExercise;
import com.barutta02.FitnessApp.exercise.ExerciseService;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;
import com.barutta02.FitnessApp.periodo.Obiettivo;
import com.barutta02.FitnessApp.periodo.PeriodoService;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoResponse;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoAllenamentoService;
import com.barutta02.FitnessApp.progresso.ProgressoService;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoResponse;
import com.barutta02.FitnessApp.user.User;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
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
        ArrayList<ProgressoResponse> progressi = new ArrayList<>();
        ProgressoResponse progresso = new ProgressoResponse();
        progresso.setDataMisurazione(LocalDate.of(2023, 1, 1));
        progresso.setPesoKg(70);
        progresso.setAltezzaCm(175);
        progresso.setPercentualeMassaGrassa(15);
        progresso.setPercentualeMassaMuscolare(40);
        progressi.add(progresso);
        when(progressoService.getLastNProgressi(5, connectedUser)).thenReturn(progressi);
        PeriodoResponse periodo = new PeriodoResponse();
        periodo.setName("Test Period");
        periodo.setObiettivo(Obiettivo.DEFINIZIONE);
        periodo.setDurata_in_giorni(30);
        periodo.setData_inizio(LocalDate.of(2023, 1, 1));
        periodo.setData_fine(LocalDate.of(2023, 1, 31));
        when(periodoService.findAuthenticatedUserActivePeriodo(connectedUser)).thenReturn(periodo);
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
    }

    @Test
    void testGetUserDataMinimal() {
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
                          "Periodo attivo dell'utente:\n" +
                          "Nome periodo: Test Period\n" +
                          "Obiettivo: DEFINIZIONE\n" +
                          "Durata in giorni del periodo (ovvero ogni quanti giorni si ripete il periodo): 30\n" +
                          "Data inizio: 2023-01-01\n" +
                          "Data fine: 2023-01-31\n" +
                          "Indice del giorno del periodo in cui ci si trova: 5\n";
        assertEquals(expected, result);
    }

    @Test
    void testGetUserDataComplete(){
        String result = userDataExtractor.getUserDataComplete(connectedUser);
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
                          "Periodo attivo dell'utente:\n" +
                          "Nome periodo: Test Period\n" +
                          "Obiettivo: DEFINIZIONE\n" +
                          "Durata in giorni del periodo (ovvero ogni quanti giorni si ripete il periodo): 30\n" +
                          "Data inizio: 2023-01-01\n" +
                          "Data fine: 2023-01-31\n" +
                          "Indice del giorno del periodo in cui ci si trova: 5\n" +
                          "Non ci sono allenamenti associati al periodo attivo dell'utente\n";
        assertEquals(expected, result);
    }

    @Test
    void testGetUserExercises() {
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