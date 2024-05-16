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

    @NotEmpty(message = "Lo username è obbligatorio")
    @NotNull(message = "Lo username è obbligatorio")
    private String username;

    @NotEmpty(message = "La password è obbligatoria")
    @NotNull(message = "La password è obbligatoria")
    private String password;
}
