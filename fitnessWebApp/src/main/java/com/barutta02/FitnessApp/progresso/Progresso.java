package com.barutta02.FitnessApp.progresso;

import java.time.LocalDate;

import com.barutta02.FitnessApp.common.BaseEntity;
import com.barutta02.FitnessApp.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.UniqueConstraint;
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
       uniqueConstraints = {@UniqueConstraint(columnNames = {"dataMisurazione", "created_by_user"})})
public class Progresso extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private LocalDate dataMisurazione;

    @Column(nullable = false)
    private float pesoKg;

    @Column(nullable = false)
    private float altezzaCm;

    private float percentualeMassaGrassa;

    private float percentualeMassaMagra;

    @Column(length = 500)
    private String note;

    @ManyToOne
    @JoinColumn(name = "created_by_user")
    private User creator;
}