package com.barutta02.FitnessApp.user.DTO;

import java.time.LocalDate;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;

public record UserRequest(
    @NotEmpty(message = "Il nome è obbligatorio")
    @NotNull(message = "Il nome è obbligatorio")
    String firstname,

    @NotEmpty(message = "Il cognome è obbligatorio")
    @NotNull(message = "Il cognome è obbligatorio")
    String lastname,

    @NotNull(message = "La data di nascita è obbligatoria")
    @Past(message = "La data di nascita deve essere passata")
    LocalDate dateOfBirth,
    
    String oldPassword,

    String newPassword
) {   
}
