package com.barutta02.FitnessApp.allenamento_esercizio;

import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.common.BaseEntity;
import com.barutta02.FitnessApp.exercise.Exercise;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "_allenamentoEsercizio",uniqueConstraints = {@UniqueConstraint(columnNames = {"allenamento","index"})})
public class AllenamentoEsercizio extends BaseEntity{
    
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "allenamento", referencedColumnName = "id",updatable = false, nullable = false)
        private Allenamento allenamento;
        
        
        @Column(nullable = false)
        private int index;

        @ManyToOne
        @JoinColumn(name = "exercise_id")
        private Exercise exercise;
        
        private int ripetizioni;
        private int serie;
        private int recupero;

}
