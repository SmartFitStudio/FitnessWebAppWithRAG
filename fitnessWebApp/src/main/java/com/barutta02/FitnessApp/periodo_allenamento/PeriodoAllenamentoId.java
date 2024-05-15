package com.barutta02.FitnessApp.periodo_allenamento;
import java.io.Serializable;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.periodo.Periodo;
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
public class PeriodoAllenamentoId implements Serializable {

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "allenamento", referencedColumnName = "name", updatable = false, nullable = false),
        @JoinColumn(name = "allenamento_creator_id", referencedColumnName = "creator", updatable = false)
    })
    private Allenamento allenamento;

    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "periodo", referencedColumnName = "name",updatable = false, nullable = false),
        @JoinColumn(name = "periodo_creator_id", referencedColumnName = "creator",updatable = false ) //NOTE: questa colonna deve essere uguale a quella sopra quindi, la stessa ma facendo cosi mi abilito la possibilità di poter utilizzare allenamenti di altre persone in aggiornamenti futuri
    })
    private Periodo periodo;

    private int giorno_del_periodo;

    private PeriodoGiornata periodo_giornata;
}