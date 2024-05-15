package com.barutta02.FitnessApp.progresso;

import java.util.Date;
import java.util.List;

import com.barutta02.FitnessApp.allenamento_esercizio.AllenamentoEsercizio;
import com.barutta02.FitnessApp.common.BaseEntity;
import com.barutta02.FitnessApp.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "_progresso",
       uniqueConstraints = {@UniqueConstraint(columnNames = {"data_misurazione", "created_by_user"})})
public class Progresso extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date data_misurazione;

    private float peso_kg;

    private float altezza_cm;

    private float percentaule_massa_grassa;

    private float percentaule_massa_magra;

    @ManyToOne
    @JoinColumn(name = "created_by_user")
    private User creator;
}