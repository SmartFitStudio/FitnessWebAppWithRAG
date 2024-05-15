package com.barutta02.FitnessApp.periodo.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import com.barutta02.FitnessApp.periodo.Obiettivo;

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
public class PeriodoResponse {
@NotNull(message = "L'id del periodo è necessario")
private Long id;
@NotNull(message = "Il nome del periodo è necessario")
private String name;
@NotNull(message = "L'obiettivo del periodo è necessaria")
private Obiettivo obiettivo;
@NotNull(message = "La durata in giorni è necessaria")
private int durata_in_giorni;
@NotNull(message = "La data di inizio è necessaria")
private LocalDate data_inizio;

private LocalDate data_fine;
@NotNull(message = "E' necessario specificare se il periodo è attivo")
private boolean attivo;
private String creator_username;
}