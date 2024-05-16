package com.barutta02.FitnessApp.user;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.barutta02.FitnessApp.Notifica.Notifica;
import com.barutta02.FitnessApp.allenamento.Allenamento;
import com.barutta02.FitnessApp.exercise.Exercise;
import com.barutta02.FitnessApp.periodo.Periodo;
import com.barutta02.FitnessApp.role.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static jakarta.persistence.FetchType.EAGER;

/*
 * UserDetails: Questa interfaccia è utilizzata per rappresentare i dettagli di un utente all'interno del sistema di autenticazione di Spring Security. Contiene metodi per ottenere informazioni come il nome utente, la password, i ruoli assegnati all'utente e lo stato dell'account. Implementando questa interfaccia, la classe User fornisce i dettagli dell'utente necessari a Spring Security per autenticare e autorizzare l'utente all'interno dell'applicazione.
Principal: Questa interfaccia rappresenta l'identità principale dell'utente all'interno del sistema. Essa fornisce un modo per recuperare l'identità dell'utente, tipicamente il suo nome utente, utilizzando il metodo getName(). Implementando questa interfaccia, la classe User diventa un oggetto Principal, il che significa che può essere utilizzata per rappresentare l'utente corrente all'interno del contesto di sicurezza dell'applicazione.

POTEVAMO FARE A MENO DI PRINCIPAL E USARE SOLO USERDETAILS
 */
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_user")
@EntityListeners(AuditingEntityListener.class) //KEEP TRACK OF CREATED DATE AND LAST MODIFIED DATE
public class User implements UserDetails, Principal {

    @Id
    @GeneratedValue
    private Integer id;
    private String firstname;
    private String lastname;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String username;
    
    @Temporal(TemporalType.DATE)
    private LocalDate dateOfBirth;

    private String password;
    private boolean accountLocked;
    private boolean enabled;

    @ManyToMany(fetch = EAGER) 
    private List<Role> roles;
    

    @OneToMany(mappedBy = "creator")
    private List<Exercise> exercises;

    @OneToMany(mappedBy = "creator")
    private List<Allenamento> allenamenti;
   
    @OneToMany(mappedBy = "creator")
    private List<Periodo> periodi;

    @OneToMany(mappedBy = "creator")
    private List<Notifica> notifiche;
    //Automatically setted by Spring Data JPA
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModifiedDate;

   /*
    * This method is used to get the authorities of the user
    */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles
                .stream()
                .map(r -> new SimpleGrantedAuthority(r.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public String fullName() {
        return getFirstname() + " " + getLastname();
    }

    @Override
    public String getName() { //UNIQUE IDENTIFIER for user
        return username;
    }

    public String getFullName() {
        return firstname + " " + lastname;
    }
}
