package com.barutta02.FitnessApp.periodo;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import com.barutta02.FitnessApp.common.BaseEntity;
import com.barutta02.FitnessApp.periodo_allenamento.PeriodoAllenamento;
import com.barutta02.FitnessApp.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import static jakarta.persistence.FetchType.LAZY;


@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_periodo",uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "created_by_user"})})
public class Periodo extends BaseEntity{
    
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, length = 100)
        private String name;
        
        @ManyToOne
        @JoinColumn(name = "created_by_user")
        private User creator; 

        @Enumerated(EnumType.STRING)
        private Obiettivo obiettivo;

        private int durata_in_giorni;

        @Temporal(TemporalType.DATE)
        private LocalDate data_inizio;
        @Temporal(TemporalType.DATE)
        private LocalDate data_fine;

        private boolean attivo;

        @OneToMany(mappedBy = "periodo", fetch = LAZY, cascade = CascadeType.ALL)
        private List<PeriodoAllenamento> periodo_allenamenti;
}
