package com.barutta02.FitnessApp.progresso.DTO;

import java.util.Date;

import com.barutta02.FitnessApp.user.User;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;

public record ProgressoRequest(
    Long id,
    @NotNull(message = "La data di misurazione è necessaria")
    @PastOrPresent(message = "La data di misurazione deve essere passata o presente")
    Date data_misurazione,
    @NotNull(message = "Il peso è necessario")
    float peso_kg,
    @NotNull(message = "L'altezza è necessaria")
    float altezza_cm,
    @NotNull(message = "Il percentuale di massa grassa è necessario")
    float percentaule_massa_grassa,
    @NotNull(message = "Il percentuale di massa magra è necessario")
    float percentaule_massa_magra
){}
