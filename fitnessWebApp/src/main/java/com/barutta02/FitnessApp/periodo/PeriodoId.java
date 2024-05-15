package com.barutta02.FitnessApp.periodo;
import java.io.Serializable;

import com.barutta02.FitnessApp.user.User;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
public class PeriodoId implements Serializable {
    private String name;
    @ManyToOne
    @JoinColumn(name = "creator")
    private User creator; 
}