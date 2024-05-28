package com.barutta02.FitnessApp.ragllm.DTO;

import java.util.Arrays;

import com.barutta02.FitnessApp.ragllm.DietCategory;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record DietBase(
    @NotNull(message = "Il titolo della dieta è necessario") 
    @NotEmpty(message = "Il titolo della dieta è necessario")
    String titolo,
    @NotNull(message = "La descrizione della dieta è necessaria") 
    @NotEmpty(message = "La descrizione della dieta è necessaria")
    String descrizione,
    DietCategory[] categorie
) {
    @Override
    public String toString() {
        return "Titolo della dieta: " + titolo + "\nDescrizione della dieta: " + descrizione + "\nCategorie della dieta: " + Arrays.toString(categorie) + "\n";
    }
}
