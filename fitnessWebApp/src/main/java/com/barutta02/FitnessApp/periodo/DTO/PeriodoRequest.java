package com.barutta02.FitnessApp.periodo.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import com.barutta02.FitnessApp.periodo.Obiettivo;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PeriodoRequest(
    Long id,
    @NotNull(message = "Il nome del peroodo è necessario") 
    @NotEmpty(message = "Il nome del periodo è necessario")
    String name,

    @NotNull(message = "L'obbiettivo è necessario") 
    Obiettivo obiettivo,

    @NotNull(message = "La durata in giorni è necessaria") 
    @Min(value = 1, message = "Value must be greater than 0")
    int durata_in_giorni,
    @NotNull(message = "La data di inizio è necessaria")
    //@FutureOrPresent(message = "La data di inizio deve essere presente o futura")
    LocalDate data_inizio,
    //@Future(message = "La data di fine deve essere futura")
    LocalDate data_fine,

    @NotNull(message = "E' necessario specificare se il periodo è attivo")
    boolean attivo
){}
