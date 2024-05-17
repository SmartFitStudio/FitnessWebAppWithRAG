package com.barutta02.FitnessApp.progresso;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoRequest;
import com.barutta02.FitnessApp.progresso.DTO.ProgressoResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("progress")
@RequiredArgsConstructor
@Tag(name = "Progress")
public class ProgressoController {

    private final ProgressoService service;

    @PostMapping()
    public ResponseEntity<ProgressoResponse> addProgresso(
            @Valid @RequestBody ProgressoRequest request,
            Authentication connectedUser) {
        ProgressoResponse createdResource = service.save(request, connectedUser);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{progresso-id}")
                .buildAndExpand(createdResource.getId())
                .toUri();
        return ResponseEntity.created(location).body(createdResource);
    }

    @PutMapping("/{progresso-id}")
    public ResponseEntity<?> updateProgresso(
            @PathVariable("progresso-id") Long id,
            @Valid @RequestBody ProgressoRequest request,
            Authentication connectedUser) {
        service.updateProgresso(id, request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{progresso-id}")
    public ResponseEntity<ProgressoResponse> getProgresso(
            @PathVariable("progresso-id") Long id,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.getProgresso(id, connectedUser));
    }

    @GetMapping("/last/{N}")
    public ResponseEntity<ArrayList<ProgressoResponse>> getLastNProgressi(
            @PathVariable("N") Integer N,
            Authentication connectedUser) {
        return ResponseEntity.ok(service.getLastNProgressi(N, connectedUser));
    }

    @GetMapping("/all")
    public ResponseEntity<ArrayList<ProgressoResponse>> getAllProgressi(
            Authentication connectedUser) {
        return ResponseEntity.ok(service.getAllProgressi(connectedUser));
    }

    @DeleteMapping("/{progresso-id}")
    public ResponseEntity<?> deleteProgresso(
            @PathVariable("progresso-id") Long id,
            Authentication connectedUser) {
        service.deleteProgresso(id, connectedUser);
        return ResponseEntity.noContent().build();
    }
}
