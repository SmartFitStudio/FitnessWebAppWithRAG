package com.barutta02.FitnessApp.allenamento;

import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoRequest;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.common.PageResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("trainings")
@RequiredArgsConstructor
@Tag(name = "Train")
public class AllenamentoController {
    private final AllenamentoService service;

    /*
     * Quando si crea una nuova risorsa, è comune restituire un HTTP status code 201
     * (Created) insieme alla risorsa creata o
     * un identificativo della stessa. Inoltre, si può includere un header Location
     * che punta all'URL della nuova risorsa.
     */
    @PostMapping
    public ResponseEntity<AllenamentoResponse> saveAllenamento(
            @Valid @RequestBody AllenamentoRequest request,
            Authentication connectedUser // questo oggetto viene inserito dal security context di spring, contiene
                                         // informazioni sull'utente autenticato, guarda schema di autenticazione
    ) {
        AllenamentoResponse createdResource = service.save(request, connectedUser);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{allenamento-id}")
                .buildAndExpand(createdResource.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdResource);
    }

    /*
     * Per ottenere una risorsa, è comune restituire un HTTP status code 200 (OK)
     * insieme alla risorsa richiesta.
     */
    @GetMapping("/{allenamento-id}")
    public ResponseEntity<AllenamentoResponse> findAllenamentoById(
            @PathVariable("allenamento-id") Long allenamento_id,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findByIdCreator(allenamento_id, connectedUser));
    }

    @GetMapping("/creator")
    public ResponseEntity<PageResponse<AllenamentoResponse>> findAllAllenamentoByCreator(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findAllMyAllenamento(page, size, connectedUser));
    }

    @GetMapping("/creator/no_pagination")
    public ResponseEntity<ArrayList<AllenamentoResponse>> findAllAllenamentoByCreator_noPagination(
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findAllByCreator(connectedUser));
    }

    /*
     * Per eliminare una risorsa, si utilizza solitamente un HTTP status code 204
     * (No Content). Se la risorsa da eliminare non esiste, si
     * può restituire un 404 (Not Found).
     */
    @DeleteMapping("/{allenamento-nome}")
    public ResponseEntity<?> deleteAllenamento(
            @PathVariable("allenamento-nome") String allenamento_nome,
            Authentication connectedUser) {
        service.deleteAllenamento(allenamento_nome, connectedUser);
        return ResponseEntity.noContent().build();
    }
}
