package com.barutta02.FitnessApp.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegistrationRequest {

    @NotEmpty(message = "Il nome è obbligatorio")
    @NotNull(message = "Il nome è obbligatorio")
    private String firstname;
    @NotEmpty(message = "Il cognome è obbligatorio")
    @NotNull(message = "Il cognome è obbligatorio")
    private String lastname;
    @Email(message = "La email deve essere valida")
    @NotEmpty(message = "La email è obbligatoria")
    @NotNull(message = "La email è obbligatoria")
    private String email;

    @NotEmpty(message = "Lo username è obbligatorio")
    @NotNull(message = "Lo username è obbligatorio")
    @Size(min = 8, message = "Lo username deve essere lungo almeno 8 caratteri")
    private String username;

    @NotEmpty(message = "La password è obbligatoria")
    @NotNull(message = "La password è obbligatoria")
    @Size(min = 8, message = "La password deve essere lunga almeno 8 caratteri")
    private String password;
}
