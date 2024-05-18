package com.barutta02.FitnessApp.periodo;

import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoRequest;
import com.barutta02.FitnessApp.periodo.DTO.PeriodoResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.net.URI;

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
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("periods")
@RequiredArgsConstructor
@Tag(name = "Periods")
public class PeriodoController {
    private final PeriodoService service;

    @PostMapping
    public ResponseEntity<PeriodoResponse> savePeriodo(
            @Valid @RequestBody PeriodoRequest request, // Questo parametro indica che il corpo della richiesta HTTP
                                                        // verrà mappato su un oggetto PeriodoRequest e che verranno
                                                        // applicate le regole di validazione definite all'interno della
                                                        // classe PeriodoRequest (tramite annotazioni come @NotNull,
                                                        // @Min, ecc.). Se la validazione non va a buon fine, verrà
                                                        // generata un'eccezione e la richiesta non verrà inoltrata al
                                                        // metodo.
            Authentication connectedUser // the connected user is passed as an argument
    ) {
        PeriodoResponse createdResource = service.save(request, connectedUser);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{periodo-id}")
                .buildAndExpand(createdResource.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdResource);
    }

    @GetMapping("/{periodo-id}")
    public ResponseEntity<PeriodoResponse> findByAuthenticatedUserAndId(
            @PathVariable("periodo-id") Long periodo_id,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findByAuthenticatedUserAndId(periodo_id, connectedUser));
    }

    @GetMapping("/is_there_an_active_period")
    public ResponseEntity<PeriodoResponse> findAuthenticatedUserActivePeriodo(Authentication connectedUser) {
        return ResponseEntity.ok(service.findAuthenticatedUserActivePeriodo(connectedUser));
    }

    @PutMapping("disable_active_period")
    public ResponseEntity<PeriodoResponse> disableAuthenticatedUserActivePeriodo(Authentication connectedUser) {
        return ResponseEntity.ok(service.disableAuthenticatedUserActivePeriodo(connectedUser));
    }

    @GetMapping("/creator")
    public ResponseEntity<PageResponse<PeriodoResponse>> findAllAuthenticatedUserPeriodo_paginated(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findAllAuthenticatedUserPeriodo_paginated(page, size, connectedUser));
    }
    
    @DeleteMapping("/{periodo-nome}")
    public ResponseEntity<?> deletePeriodo(
            @PathVariable("periodo-nome") Long periodo_id,
            Authentication connectedUser) {
        service.deletePeriodo(periodo_id, connectedUser);
        return ResponseEntity.noContent().build();
    }
}
