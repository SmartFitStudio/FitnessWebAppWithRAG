package com.barutta02.FitnessApp.periodo_allenamento;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.common.BaseEntity;
import com.barutta02.FitnessApp.periodo.Periodo;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@EqualsAndHashCode(callSuper = true) //Questa annotazione assicura che il metodo equals e hashCode generati da Lombok includano anche i campi della classe genitore.
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_periodoAllenamento",uniqueConstraints = {@UniqueConstraint(columnNames = {"allenamento", "periodo", "giorno_del_periodo", "periodo_giornata"})})
public class PeriodoAllenamento extends BaseEntity{

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "allenamento", referencedColumnName = "id", nullable = false)
        private Allenamento allenamento;

        @ManyToOne
        @JoinColumn(name = "periodo", referencedColumnName = "id", nullable = false)       
        private Periodo periodo;
        
        private int giorno_del_periodo;
        
        @Enumerated(EnumType.STRING)
        private PeriodoGiornata periodo_giornata;

}

