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
public class AuthenticationRequest {

    @NotEmpty(message = "Il nome utente è obbligatorio")
    @NotNull(message = "Il nome utente è obbligatorio")
    private String username;

    @NotEmpty(message = "La password è obbligatoria")
    @NotNull(message = "La password è obbligatoria")
    @Size(min = 8, message = "La password deve essere lunga almeno 8 caratteri")
    private String password;
}
