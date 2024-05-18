package com.barutta02.FitnessApp.Notifica;
import com.barutta02.FitnessApp.Notifica.DTO.NotificaResponse;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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
