package com.barutta02.FitnessApp.ragllm.DTO;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record PianoAlimentareRag(
    @NotNull(message = "La dieta del lunedì è necessaria")
    @NotEmpty(message = "La dieta del lunedì è necessaria")
    DietaGiornalieraRag lun,
    @NotNull(message = "La dieta del martedì è necessaria")
    @NotEmpty(message = "La dieta del martedì è necessaria")
    DietaGiornalieraRag mar,
    @NotNull(message = "La dieta del mercoledì è necessaria")
    @NotEmpty(message = "La dieta del mercoledì è necessaria")
    DietaGiornalieraRag mer,
    @NotNull(message = "La dieta del giovedì è necessaria")
    @NotEmpty(message = "La dieta del giovedì è necessaria")
    DietaGiornalieraRag gio,
    @NotNull(message = "La dieta del venerdì è necessaria")
    @NotEmpty(message = "La dieta del venerdì è necessaria")
    DietaGiornalieraRag ven,
    @NotNull(message = "La dieta del sabato è necessaria")
    @NotEmpty(message = "La dieta del sabato è necessaria")
    DietaGiornalieraRag sab,
    @NotNull(message = "La dieta della domenica è necessaria")
    @NotEmpty(message = "La dieta della domenica è necessaria")
    DietaGiornalieraRag dom,
    @NotNull(message = "Le motivazioni del piano alimentare sono necessarie")
    @NotEmpty(message = "Le motivazioni del piano alimentare sono necessarie")
    String motivazioni
) {
}