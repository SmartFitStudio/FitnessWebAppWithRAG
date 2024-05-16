package com.barutta02.FitnessApp.user.DTO;

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
public class UserResponse {
    @NotNull(message = "Il nome dell'utente è necessario")
    private String firstname;

    @NotNull(message = "Il cognome dell'utente è necessario")
    private String lastname;

    @NotNull(message = "L'email' dell'utente è necessaria")
    private String email;

    @NotNull(message = "Lo username dell'utente è necessario")
    private String username;

    @NotNull(message = "La data di nascita dell'utente è necessaria")
    private LocalDate dateOfBirth;
}
