package com.barutta02.FitnessApp.allenamento_esercizio.DTO;

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
public class AllenamentoEsercizioResponse {
    @NotNull(message = "L'id dell'allenamento-esercizio è necessario") 
    private Long id;
    @NotNull(message = "L'id dell'allenamento è necessario")
    private Long allenamento_id;
    @NotNull(message = "L'id dell'esercizio è necessario")
    private Long esercizio_id;
    private String creator;
    @NotNull(message = "L'indice dell'esercizio è necessario")
    private int index;
    @NotNull(message = "Il numero di ripetizioni è necessario")
    private int ripetizioni;
    @NotNull(message = "Il numero di serie è necessario")
    private int serie;
    @NotNull(message = "Il tempo di recupero è necessario")
    private int recupero;

}
