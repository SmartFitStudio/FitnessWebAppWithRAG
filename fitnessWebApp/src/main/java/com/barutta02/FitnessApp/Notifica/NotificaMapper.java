package com.barutta02.FitnessApp.Notifica;

import org.springframework.stereotype.Service;

import com.barutta02.FitnessApp.Notifica.DTO.NotificaResponse;

@Service
public class NotificaMapper {
    public NotificaResponse toNotificaResponse(Notifica notifica){
        return NotificaResponse.builder()
                .id(notifica.getId())
                .title(notifica.getTitle())
                .message(notifica.getMessage())
                .read(notifica.isRead())
                .build();
    }
}
