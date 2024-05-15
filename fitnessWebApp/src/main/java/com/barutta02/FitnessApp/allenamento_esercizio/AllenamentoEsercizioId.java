package com.barutta02.FitnessApp.allenamento_esercizio;
import java.io.Serializable;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.user.User;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
@Getter
public class AllenamentoEsercizioId implements Serializable {

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "allenamento", referencedColumnName = "name",updatable = false, nullable = false),
        @JoinColumn(name = "allenamento_creator_id", referencedColumnName = "creator",updatable = false)
    })
    private Allenamento allenamento;

    private int index;
}