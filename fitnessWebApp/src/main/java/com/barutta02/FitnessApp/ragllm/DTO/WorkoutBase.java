package com.barutta02.FitnessApp.ragllm.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record WorkoutBase(
    @NotNull(message = "Il nome dell'allenamento è necessario") 
    @NotEmpty(message = "Il nome dell'allenamento è necessario")
    String nome,
    @NotNull(message = "La descrizione dell'allenamento è necessaria") 
    @NotEmpty(message = "La descrizione dell'allenamento è necessaria")
    String descrizione,
    @Min(value = 0, message = "La durata in ore dell'allenamento deve essere maggiore di 0")
    @NotNull(message = "La durata in ore dell'allenamento è necessaria")
    Float durata_in_ore
) {
    @Override
    public String toString() {
        return "Nome dell'allenamento: " + nome + "\nDescrizione dell'allenamento: " + descrizione + "\nDurata in ore dell'allenamento: " + durata_in_ore + "\n";
    }
}
