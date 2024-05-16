package com.barutta02.FitnessApp.progresso.DTO;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;

public record ProgressoRequest(
    Long id,
    @NotNull(message = "La data di misurazione è necessaria")
    @PastOrPresent(message = "La data di misurazione deve essere passata o presente")
    LocalDate data_misurazione,
    @NotNull(message = "Il peso è necessario")
    @Positive(message = "Il peso deve essere maggiore di 0")
    float peso_kg,
    @NotNull(message = "L'altezza è necessaria")
    @Positive(message = "L'altezza deve essere maggiore di 0")
    float altezza_cm,
    @NotNull(message = "La percentuale di massa grassa è necessaria")
    @Positive(message = "La percentuale di massa grassa deve essere maggiore di 0")
    float percentaule_massa_grassa,
    @NotNull(message = "La percentuale di massa magra è necessaria")
    @Positive(message = "La percentuale di massa magra deve essere maggiore di 0")
    float percentaule_massa_magra,
    @Length(max = 500, message = "Le note non possono superare i 500 caratteri")
    String note
){}
