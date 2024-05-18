package com.barutta02.FitnessApp.allenamento_esercizio;

import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioRequest;
import com.barutta02.FitnessApp.allenamento_esercizio.DTO.AllenamentoEsercizioResponse;
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
@RequestMapping("trainingexercise")
@RequiredArgsConstructor
@Tag(name = "TrainExercise")
public class AllenamentoEsercizioController {
    private final AllenamentoEsercizioService service;

    @PostMapping
    public ResponseEntity<AllenamentoEsercizioResponse> saveAllenamentoEsercizio(
            @Valid @RequestBody AllenamentoEsercizioRequest request,
            Authentication connectedUser // the connected user is passed as an argument
    ) {
        AllenamentoEsercizioResponse createdResource = service.save(request, connectedUser);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{allenamentoEsercizio-id}")
                .buildAndExpand(createdResource.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdResource);
    }

    @GetMapping("/{allenamento-nome}")
    public ResponseEntity<PageResponse<AllenamentoEsercizioResponse>> findAllAuthAllenamentoEsercizioByAllenamentoId_paginated(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @PathVariable("allenamento-nome") Long allenamento_id,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findAllAuthUserAllenamentoEsercizioByAllenamentoId_paginated(page, size, allenamento_id, connectedUser));
    }

    @GetMapping("/no_pagination/{allenamento-nome}")
    public ResponseEntity<ArrayList<AllenamentoEsercizioResponse>> findAllAuthAllenamentoEsercizioByAllenamentoId_NoPagination(
            @PathVariable("allenamento-nome") Long allenamento_id,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.findAllAuthUserAllenamentoEsercizioByAllenamentoId_noPagination(allenamento_id, connectedUser));
    }

    @DeleteMapping("/{allenamentoEsercizio-id}")
    public ResponseEntity<?> deleteAllenamentoEsercizio(
            @PathVariable("allenamentoEsercizio-id") Long id,
            Authentication connectedUser) {
        service.deleteById(id, connectedUser);
        return ResponseEntity.noContent().build();
    }
}