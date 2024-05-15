package com.barutta02.FitnessApp.Notifica.DTO;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificaResponse {
    @NotNull(message = "L'id della notifica è necessario")
    private Long id;
    @NotNull(message = "Il titolo della notifica è necessario")
    private String title;
    @NotNull(message = "Il messaggio della notifica è necessario")
    private String message;
    @NotNull(message = "La data della notifica è necessaria")
    private boolean read;

}
