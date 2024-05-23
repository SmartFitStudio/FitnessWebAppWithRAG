package com.barutta02.FitnessApp.allenamento;

import java.util.List;

import com.barutta02.FitnessApp.allenamento_esercizio.AllenamentoEsercizio;
import com.barutta02.FitnessApp.common.BaseEntity;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoAllenamento;
import com.barutta02.FitnessApp.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_allenamento",uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "created_by_user"})})
public class Allenamento extends BaseEntity{
        
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, length = 100)
        private String name;

        private String description;

        private float durata_in_ore;
        
        @ManyToOne
        @JoinColumn(name = "created_by_user")
        private User creator; 

        @OneToMany(mappedBy = "allenamento", cascade = CascadeType.ALL)
        private List<AllenamentoEsercizio> allenamenti_esercizi;

        @OneToMany(mappedBy = "allenamento", cascade = CascadeType.ALL)
        private List<PeriodoAllenamento> periodo_allenamenti;
}
