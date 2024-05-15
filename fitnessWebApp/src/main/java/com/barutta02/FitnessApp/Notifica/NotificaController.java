package com.barutta02.FitnessApp.Notifica;
import com.barutta02.FitnessApp.Notifica.DTO.NotificaResponse;
import com.barutta02.FitnessApp.allenamento.DTO.AllenamentoResponse;
import com.barutta02.FitnessApp.common.PageResponse;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseRequest;
import com.barutta02.FitnessApp.exercise.DTO.ExerciseResponse;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("notifiche")
@RequiredArgsConstructor
@Tag(name = "Notifica")
public class NotificaController {
    private final NotificaService service;

    @GetMapping("/today")
    public ResponseEntity<ArrayList<NotificaResponse>> getTodayNotification(
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(service.getTodaysNotifications(connectedUser));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NotificaResponse> signNotificationAsRead(@PathVariable Long id, Authentication connectedUser) {
        return ResponseEntity.ok(service.setNotificationAsRead(id, connectedUser));
    }
}
