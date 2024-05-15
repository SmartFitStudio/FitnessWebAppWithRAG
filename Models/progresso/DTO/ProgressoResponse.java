package com.barutta02.FitnessApp.progresso.DTO;

import java.util.Date;

import com.barutta02.FitnessApp.user.User;

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
public class ProgressoResponse {
    @NotNull(message = "L'id è necessario")
    private Long id;
    @NotNull(message = "L'id è necessario")
    private Date data_misurazione;
    @NotNull(message = "L'id è necessario")
    private float peso_kg;
    @NotNull(message = "L'id è necessario")
    private float altezza_cm;
    @NotNull(message = "L'id è necessario")
    private float percentaule_massa_grassa;
    @NotNull(message = "L'id è necessario")
    private float percentaule_massa_magra;
    @NotNull(message = "L'id è necessario")
    private String username;
}
