package com.barutta02.FitnessApp.ragllm;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.Authentication;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClient.ResponseSpec;
import org.springframework.web.reactive.function.client.WebClient.RequestBodyUriSpec;
import org.springframework.web.reactive.function.client.WebClient.RequestBodySpec;
import org.springframework.web.reactive.function.client.WebClient.RequestHeadersSpec;
import org.springframework.web.reactive.function.client.WebClient.RequestHeadersUriSpec;

import com.barutta02.FitnessApp.ragllm.DTO.*;

import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

public class RagllmServiceTest {

    @Mock
    private WebClient webClient;

    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;

    @Mock
    private WebClient.RequestBodyUriSpec requestBodyUriSpec;

    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpec;

    @Mock
    private WebClient.RequestBodySpec requestBodySpec;

    @Mock
    private WebClient.ResponseSpec responseSpec;

    @Mock
    private UserDataExtractor userDataExtractor;

    @Mock
    private Authentication connectedUser;

    @InjectMocks
    private RagllmService ragllmService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        when(webClient.post()).thenReturn(requestBodyUriSpec);
        when(requestBodyUriSpec.uri(any(String.class))).thenReturn(requestBodySpec);
        when(requestBodySpec.contentType(any())).thenReturn(requestBodySpec);
        when(requestBodySpec.bodyValue(any())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);
        when(userDataExtractor.getUserDataComplete(connectedUser)).thenReturn(
            "Nome utente: johndoe\r\n" +
            "Nome e cognome: John Doe\r\n" +
            "Data di nascita: 1990-01-01\r\n" +
            "\r\n" +
            "Ultime misurazioni dell'utente:\r\n" +
            "1)\r\n" +
            "Data misurazione: 2023-05-01\r\n" +
            "Peso in kg: 70\r\n" +
            "Altezza in cm: 175\r\n" +
            "Percentuale massa grassa: 15\r\n" +
            "Percentuale massa muscolare: 40\r\n" +
            "Note: Inizio programma di definizione\r\n" +
            "2)\r\n" +
            "Data misurazione: 2023-04-01\r\n" +
            "Peso in kg: 72\r\n" +
            "Altezza in cm: 175\r\n" +
            "Percentuale massa grassa: 16\r\n" +
            "Percentuale massa muscolare: 39\r\n" +
            "Note: Aumento massa muscolare\r\n" +
            "\r\n" +
            "Periodo attivo dell'utente:\r\n" +
            "Nome periodo: Definizione\r\n" +
            "Obiettivo: Ridurre massa grassa\r\n" +
            "Durata in giorni del periodo (ovvero ogni quanti giorni si ripete il periodo): 30\r\n" +
            "Data inizio: 2023-05-01\r\n" +
            "Data fine: 2023-05-30\r\n" +
            "Indice del giorno del periodo in cui ci si trova: 15\r\n" +
            "\r\n" +
            "Allenamenti associati al periodo attivo:\r\n" +
            "1)\r\n" +
            "Nome allenamento: Allenamento Definizione\r\n" +
            "Descrizione: Allenamento per ridurre massa grassa\r\n" +
            "Durata in ore: 1.5\r\n" +
            "Indice del giorno del periodo in cui viene eseguito: 1\r\n" +
            "Periodo della giornata in cui viene eseguito: Mattina\r\n" +
            "Esercizi associati all'allenamento:\r\n" +
            "1.1)\r\n" +
            "Nome esercizio: Squat\r\n" +
            "Descrizione: Esercizio per gambe\r\n" +
            "Categorie a cui appartiene:\r\n" +
            "-Forza\r\n" +
            "-Resistenza\r\n" +
            "Numero serie: 3\r\n" +
            "Numero ripetizioni: 12\r\n" +
            "Tempo recupero in minuti: 2\r\n" +
            "1.2)\r\n" +
            "Nome esercizio: Panca Piana\r\n" +
            "Descrizione: Esercizio per petto\r\n" +
            "Categorie a cui appartiene:\r\n" +
            "-Forza\r\n" +
            "Numero serie: 3\r\n" +
            "Numero ripetizioni: 10\r\n" +
            "Tempo recupero in minuti: 2\r\n");
        when(userDataExtractor.getUserDataMinimal(connectedUser)).thenReturn(
            "Nome utente: johndoe\r\n" +
            "Nome e cognome: John Doe\r\n" +
            "Data di nascita: 1990-01-01\r\n" +
            "\r\n" +
            "Ultime misurazioni dell'utente:\r\n" +
            "1)\r\n" +
            "Data misurazione: 2023-05-01\r\n" +
            "Peso in kg: 70\r\n" +
            "Altezza in cm: 175\r\n" +
            "Percentuale massa grassa: 15\r\n" +
            "Percentuale massa muscolare: 40\r\n" +
            "Note: Inizio programma di definizione\r\n" +
            "2)\r\n" +
            "Data misurazione: 2023-04-01\r\n" +
            "Peso in kg: 72\r\n" +
            "Altezza in cm: 175\r\n" +
            "Percentuale massa grassa: 16\r\n" +
            "Percentuale massa muscolare: 39\r\n" +
            "Note: Aumento massa muscolare\r\n" +
            "\r\n" +
            "Periodo attivo dell'utente:\r\n" +
            "Nome periodo: Definizione\r\n" +
            "Obiettivo: Ridurre massa grassa\r\n" +
            "Durata in giorni del periodo (ovvero ogni quanti giorni si ripete il periodo): 30\r\n" +
            "Data inizio: 2023-05-01\r\n" +
            "Data fine: 2023-05-30\r\n" +
            "Indice del giorno del periodo in cui ci si trova: 15\r\n");
        when(userDataExtractor.getUserExercises(connectedUser)).thenReturn(
            "ID: 1\n" +
            "Nome esercizio: Squat\n" +
            "Descrizione: Esercizio per gambe\n" +
            "Categorie a cui appartiene: \n" +
            "-Forza\n" +
            "-Quadricipiti\n" +
            "---\n" +
            "ID: 2\n" +
            "Nome esercizio: Panca Piana\n" +
            "Descrizione: Esercizio per petto\n" +
            "Categorie a cui appartiene: \n" +
            "-Pettorali\n" +
            "---\n" +
            "ID: 3\n" +
            "Nome esercizio: Deadlift\n" +
            "Descrizione: Esercizio per schiena\n" +
            "Categorie a cui appartiene: \n" +
            "-Forza\n" +
            "-Full body\n" +
            "---"
        );
    }

    @Test
    public void testAnswerQuestion() {
        Question question = new Question("Come posso allenare il petto?");
        ChatbotResponse expectedResponse = new ChatbotResponse("Panca piana, spinte con manubri ...");
        when(responseSpec.bodyToMono(ChatbotResponse.class)).thenReturn(Mono.just(expectedResponse));
        Mono<ChatbotResponse> responseMono = ragllmService.answerQuestion(question, connectedUser);
        StepVerifier.create(responseMono)
                .expectNextMatches(actualResponse -> actualResponse.response().equals(expectedResponse.response()))
                .verifyComplete();
    }

    @Test
    public void testGenerateWorkout() {
        WorkoutBase workoutBase = new WorkoutBase("Nome","Descrizione", 2.5f);
        EsercizioRag esercizioRag = new EsercizioRag(1L, 3, 12, 2);
        WorkoutResponse expectedResponse = new WorkoutResponse(new ArrayList<EsercizioRag>(List.of(esercizioRag, esercizioRag)));
        when(responseSpec.bodyToMono(WorkoutResponse.class)).thenReturn(Mono.just(expectedResponse));
        Mono<WorkoutResponse> responseMono = ragllmService.generateWorkout(workoutBase, connectedUser);
        StepVerifier.create(responseMono)
                .expectNextMatches(actualResponse -> actualResponse.esercizi().equals(expectedResponse.esercizi()))
                .verifyComplete();
    }

    @Test
    public void testGenerateDiet() {
        DietBase dietBase = new DietBase("Titolo","Descrizione", new DietCategory[]{DietCategory.VEGANA, DietCategory.SENZA_GLUTINE});
        AlimentoRag alimentoRag = new AlimentoRag("Pasta", 100, 350);
        PastoRag pastoRag = new PastoRag(new ArrayList<AlimentoRag>(List.of(alimentoRag, alimentoRag)));
        DietaGiornalieraRag dietaGiornalieraRag = new DietaGiornalieraRag(pastoRag, pastoRag, pastoRag);
        PianoAlimentareRag expectedResponse = new PianoAlimentareRag(dietaGiornalieraRag,dietaGiornalieraRag,dietaGiornalieraRag,dietaGiornalieraRag,dietaGiornalieraRag,dietaGiornalieraRag,dietaGiornalieraRag,"Dieta per vegani celiaci");
        when(responseSpec.bodyToMono(PianoAlimentareRag.class)).thenReturn(Mono.just(expectedResponse));
        Mono<PianoAlimentareRag> responseMono = ragllmService.generateDiet(dietBase, connectedUser);
        StepVerifier.create(responseMono)
                .expectNextMatches(actualResponse -> actualResponse.equals(expectedResponse))
                .verifyComplete();
    }
}
