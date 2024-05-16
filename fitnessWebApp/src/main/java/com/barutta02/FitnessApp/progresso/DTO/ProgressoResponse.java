package com.barutta02.FitnessApp.progresso.DTO;

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
public class ProgressoResponse {
    @NotNull(message = "L'id è necessario")
    private Long id;
    @NotNull(message = "La data di misurazione è necessaria")
    private LocalDate data_misurazione;
    @NotNull(message = "Il peso è necessario")
    private float peso_kg;
    @NotNull(message = "L'altezza è necessaria")
    private float altezza_cm;
    @NotNull(message = "La percentuale di massa grassa è necessaria")
    private float percentaule_massa_grassa;
    @NotNull(message = "La percentuale di massa magra è necessaria")
    private float percentaule_massa_magra;
    private String note;
}
