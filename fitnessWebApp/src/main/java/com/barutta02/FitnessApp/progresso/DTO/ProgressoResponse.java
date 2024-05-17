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
    private LocalDate dataMisurazione;
    @NotNull(message = "Il peso è necessario")
    private float pesoKg;
    @NotNull(message = "L'altezza è necessaria")
    private float altezzaCm;
    @NotNull(message = "La percentuale di massa grassa è necessaria")
    private float percentualeMassaGrassa;
    @NotNull(message = "La percentuale di massa magra è necessaria")
    private float percentualeMassaMagra;
    private String note;
}
