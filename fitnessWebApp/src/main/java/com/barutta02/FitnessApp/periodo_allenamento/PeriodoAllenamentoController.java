package com.barutta02.FitnessApp.periodo_allenamento;


import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.periodo_allenamento.DTO.PeriodoAllenamentoRequest;
import com.barutta02.FitnessApp.periodo_allenamento.DTO.PeriodoAllenamentoResponse;

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
@RequestMapping("periodTraining")
@RequiredArgsConstructor
@Tag(name = "PeriodTraining")
public class PeriodoAllenamentoController {
    private final PeriodoAllenamentoService service;

    @PostMapping
    public ResponseEntity<PeriodoAllenamentoResponse> savePeriodoAllenamento(
            @Valid @RequestBody PeriodoAllenamentoRequest request,
            Authentication connectedUser //the connected user is passed as an argument
    ) {
        PeriodoAllenamentoResponse createdResource = service.save(request, connectedUser);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{periodo-allenamento-id}")
                .buildAndExpand(createdResource.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdResource);
    }


    @GetMapping("/{periodo-id}")
    public ResponseEntity<PageResponse<PeriodoAllenamentoResponse>> findAllAuthUserPeriodoAllenamentoByPeriodoId_paginated(
        @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            @PathVariable("periodo-id") Long periodo_id,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllAuthUserPeriodoAllenamentoByPeriodoId_paginated(page,size,periodo_id, connectedUser));
    }

    @GetMapping("/no_pagination/{periodo-id}")
    public ResponseEntity<ArrayList<PeriodoAllenamentoResponse>> findAllAuthUserPeriodoAllenamentoByPeriodoId_noPagination(
            @PathVariable("periodo-id") Long periodo_id,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.findAllAuthUserPeriodoAllenamentoByPeriodoId_noPagination(periodo_id, connectedUser));
    }

    @DeleteMapping("/{periodo-allenamento-id}")
    public ResponseEntity<?> deletePeriodoAllenamento(
        @PathVariable("periodo-allenamento-id") Long periodo_allenamento_id,
        Authentication connectedUser
    ) {
        service.deleteById(periodo_allenamento_id, connectedUser);
        return ResponseEntity.noContent().build();
    }
}