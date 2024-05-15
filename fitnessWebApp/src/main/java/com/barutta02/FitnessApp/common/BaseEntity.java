package com.barutta02.FitnessApp.common;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/*
 * This class is the base class for all entities in the application.
 * It contains the common fields that are used in all entities.
 */
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass //This annotation is used to specify that the class is an entity class that is a superclass for other entity classes.
//L'annotazione @MappedSuperclass è un'annotazione fornita da JPA (Java Persistence API) e viene utilizzata per indicare che una classe è una superclasse mappata. Questo significa che gli attributi della classe annotata con @MappedSuperclass possono essere mappati alle colonne del database, ma l'annotazione stessa non ha una tabella corrispondente nel database.
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;
}
