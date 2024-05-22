package com.barutta02.FitnessApp.exercise;

import java.util.List;

import com.barutta02.FitnessApp.allenamento_esercizio.AllenamentoEsercizio;
import com.barutta02.FitnessApp.common.BaseEntity;
import com.barutta02.FitnessApp.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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
@Table(name = "_exercise")
public class Exercise extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Size(min=1)
    @ElementCollection(fetch = FetchType.LAZY)
    @Enumerated(EnumType.STRING)
    private CategoryExercise[] category;

    private String description;

    private boolean shareable;

    private String cover; //path to the exercise cover

    @OneToMany(mappedBy = "exercise_id", cascade = CascadeType.ALL)
    private List<AllenamentoEsercizio> allenamenti_esercizi;

    @ManyToOne
    @JoinColumn(name = "created_by_user")
    private User creator;

}