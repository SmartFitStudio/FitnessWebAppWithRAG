package com.barutta02.FitnessApp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import com.barutta02.FitnessApp.exercise.CategoryExercise;
import com.barutta02.FitnessApp.exercise.Exercise;
import com.barutta02.FitnessApp.exercise.ExerciseRepository;
import com.barutta02.FitnessApp.role.Role;
import com.barutta02.FitnessApp.role.RoleRepository;

@EnableJpaAuditing(auditorAwareRef = "auditorAware") // Enable JPA Auditing with the given AuditorAware bean name present in /config 
@EnableAsync
@SpringBootApplication
public class FitnessApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitnessApplication.class, args);
	}

	/*
	 * This method is used to create a default role if it does not exist in the database.
	 	  Definisce un bean di tipo CommandLineRunner, che viene utilizzato per eseguire codice durante la fase di avvio dell'applicazione Spring Boot.
	 */
	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository) {
		return args -> {
			if (roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(Role.builder().name("USER").build());
			}
		};
	}

	@Bean
	public CommandLineRunner runner_default_exercise(ExerciseRepository exerciseRepository) {
		return args -> {
			if (exerciseRepository.findByName("Panca piana con bilancere").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
									.name("Panca piana con bilancere")
									.description("Eserecizio per il petto con bilancere")
									.cover("./uploads\\defaults\\panca_piana_bilancere.jpg")
									.shareable(false)
									.category(new CategoryExercise[]{CategoryExercise.CHEST})
									.build());
			}
			if (exerciseRepository.findByName("Military press").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
									.name("Military press")
									.description("Esercizio per le spalle")
									.shareable(false)
									.cover("./uploads\\defaults\\military_press.webp")
									.category(new CategoryExercise[]{CategoryExercise.SHOULDERS, CategoryExercise.CHEST})
									.build());
			}
			if (exerciseRepository.findByName("Panca inclinata con bilancere").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
									.name("Panca inclinata con bilancere")
									.description("Esercizio per il petto")
									.cover("./uploads\\defaults\\panca_inclinata_bilancere.avif")
									.shareable(false)
									.category(new CategoryExercise[]{CategoryExercise.SHOULDERS, CategoryExercise.CHEST})
									.build());
			}
			if (exerciseRepository.findByName("Squat").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
									.name("Squat")
									.description("Esercizio per le gambe")
									.cover("./uploads\\defaults\\squat.jpg")
									.shareable(false)
									.category(new CategoryExercise[]{CategoryExercise.FULL_BODY, CategoryExercise.LEGS})
									.build());
			}
			if (exerciseRepository.findByName("Panca piana con manubri").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
									.name("Panca piana con manubri")
									.description("Esercizio per il petto")
									.cover("./uploads\\defaults\\panca_piana_manubri.jpg")
									.shareable(false)
									.category(new CategoryExercise[]{CategoryExercise.CHEST, CategoryExercise.SHOULDERS})
									.build());
			}
			if (exerciseRepository.findByName("Stacco rumeno").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
									.name("Stacco rumeno")
									.description("Esercizio per la schiena e i glutei") 
									.cover("./uploads\\defaults\\stacco_rumeno.jpg")
									.shareable(false)
									.category(new CategoryExercise[]{CategoryExercise.BACK, CategoryExercise.STRONGMAN})
									.build());
			}
			
		};
	}
}
