package com.barutta02.FitnessApp.allenamento.DTO;
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
public class AllenamentoResponse {
@NotNull(message = "L'id dell'allenamento è necessario")
private Long id;
@NotNull(message = "Il nome dell'allenamento è necessario")
private String name;
@NotNull(message = "La descrizione dell'allenamento è necessaria")
private String description;
@NotNull(message = "La durata dell'allenamento è necessaria")
private float durata_in_ore;
@NotNull(message = "L'id dell'utente creatore è necessario")
private String creator_username;
}
