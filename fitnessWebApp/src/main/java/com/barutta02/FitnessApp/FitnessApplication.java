package com.barutta02.FitnessApp;

import java.util.List;

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
import com.barutta02.FitnessApp.user.User;
import com.barutta02.FitnessApp.user.UserRepository;

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
	public CommandLineRunner runner_test_integration(UserRepository userRepository,RoleRepository roleRepository) {
		return args -> {
			if (userRepository.findByUsername("tester_user").isEmpty()) {
				userRepository.save(User.builder()
							.username("tester_user")
							.email("test@gmail.com")
							.password("$2a$10$.XN1ewwDH4KDjdwpQE32wOm0p0pR6Z5co6qRyy2loXPT9OSG/v80a")
							.firstname("test")
							.lastname("test")
							.enabled(true)
							.roles(roleRepository.findByName("USER").map(List::of).orElse(List.of()))
							.build()
							);
			}
		};
	}

	@Bean
	public CommandLineRunner runner_default_exercise(ExerciseRepository exerciseRepository) {
		return args -> {
			if (exerciseRepository.findByName("Squat").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Squat")
					.description("Lo squat è un esercizio fondamentale per sviluppare la forza e la resistenza delle gambe. Coinvolge principalmente i quadricipiti.")
					.cover("./uploads/defaults/squat.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.QUADRICIPITI})
					.build());
			}
			
			if (exerciseRepository.findByName("Trazioni alla sbarra").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Trazioni alla sbarra")
					.description("Le trazioni alla sbarra sono un esercizio fondamentale per sviluppare la forza della parte superiore del corpo, in particolare dei muscoli della schiena e delle braccia.")
					.cover("./uploads/defaults/trazioni.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.CALISTHENICS, CategoryExercise.DORSALI})
					.build());
			}
			
			if (exerciseRepository.findByName("Plank").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Plank")
					.description("Il plank è un esercizio statico che aiuta a rafforzare i muscoli addominali, la parte bassa della schiena e i muscoli stabilizzatori della colonna vertebrale.")
					.cover("./uploads/defaults/plank.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FLESSIBILITÀ, CategoryExercise.ADDOME})
					.build());
			}
			
			if (exerciseRepository.findByName("Affondi").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Affondi")
					.description("Gli affondi sono un esercizio che coinvolge principalmente i muscoli delle gambe, come i quadricipiti, i glutei e i muscoli posteriori delle cosce. Migliorano la forza e l'equilibrio.")
					.cover("./uploads/defaults/affondi.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.GLUTEI , CategoryExercise.EQUILIBRIO})
					.build());
			}
			
			if (exerciseRepository.findByName("Curl con manubri").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Curl con manubri")
					.description("Il curl con manubri è un esercizio mirato per sviluppare i muscoli dei bicipiti. Può essere eseguito in piedi o seduti, sollecitando anche i muscoli dell'avambraccio.")
					.cover("./uploads/defaults/curl_manubri.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.BICIPITI})
					.build());
			}
			
			if (exerciseRepository.findByName("Stacco da terra").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Stacco da terra")
					.description("Lo stacco da terra è un esercizio complesso che coinvolge molti muscoli del corpo, tra cui i muscoli della schiena, i glutei, i muscoli posteriori delle cosce e i muscoli dell'avambraccio.")
					.cover("./uploads/defaults/stacco.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.FULL_BODY})
					.build());
			}
			
			if (exerciseRepository.findByName("Burpees").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Burpees")
					.description("I burpees sono un esercizio completo che coinvolge tutto il corpo, compresi i muscoli delle braccia, delle gambe, del petto, della schiena e degli addominali. Sono ottimi per allenare la forza e l'agilità.")
					.cover("./uploads/defaults/burpees.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.CARDIO, CategoryExercise.FULL_BODY})
					.build());
			}
			
			if (exerciseRepository.findByName("Panca piana con bilancere").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Panca piana con bilancere")
					.description("Esercizio fondamentale per sviluppare la massa e la forza del petto utilizzando un bilancere come resistenza principale.")
					.cover("./uploads/defaults/panca_piana_bilancere.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.PETTORALI})
					.build());
			}
			
			if (exerciseRepository.findByName("Military press").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Military press")
					.description("Esercizio per sviluppare la forza e la dimensione delle spalle utilizzando un bilancere o una macchina specifica per la pressa militare.")
					.cover("./uploads/defaults/military_press.webp")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.SPALLE})
					.build());
			}
			
			if (exerciseRepository.findByName("Panca inclinata con bilancere").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Panca inclinata con bilancere")
					.description("Variante dell'esercizio di panca piana in cui il piano è inclinato, mettendo maggiore enfasi sulla parte superiore del petto.")
					.cover("./uploads/defaults/panca_inclinata_bilancere.avif")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.PETTORALI, CategoryExercise.SPALLE})
					.build());
			}
			
			if (exerciseRepository.findByName("Panca piana con manubri").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Panca piana con manubri")
					.description("Variante dell'esercizio di panca piana utilizzando manubri anziché un bilancere, permettendo una maggiore libertà di movimento.")
					.cover("./uploads/defaults/panca_piana_manubri.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.PETTORALI, CategoryExercise.SPALLE})
					.build());
			}	
			
			if (exerciseRepository.findByName("Leg Press").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Leg Press")
					.description("Esercizio per sviluppare la forza e la massa muscolare delle gambe. Coinvolge principalmente i quadricipiti, i glutei e i muscoli posteriori delle cosce.")
					.cover("./uploads/defaults/leg_press.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.QUADRICIPITI})
					.build());
			}
			
			if (exerciseRepository.findByName("Push-Up").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Push-Up")
					.description("Esercizio che coinvolge pettorali, tricipiti, deltoidi e core. È un esercizio versatile che può essere adattato per tutti i livelli di fitness.")
					.cover("./uploads/defaults/push_up.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.PETTORALI})
					.build());
			}
			
			if (exerciseRepository.findByName("Dips").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Dips")
					.description("Esercizio che coinvolge principalmente pettorali, tricipiti e deltoidi anteriori. È un ottimo esercizio per sviluppare la forza e la definizione della parte superiore del corpo.")
					.cover("./uploads/defaults/dips.webp")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.CALISTHENICS, CategoryExercise.PETTORALI})
					.build());
			}
			
			if (exerciseRepository.findByName("Hip Thrust").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Hip Thrust")
					.description("Esercizio mirato per sviluppare i glutei e migliorare la stabilità del bacino. È un esercizio efficace per migliorare la forza e la forma del gluteo.")
					.cover("./uploads/defaults/hip_thrust.avif")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.GLUTEI})
					.build());
			}

			if (exerciseRepository.findByName("Polpacci in piedi").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Polpacci in piedi")
					.description("Esercizio per sviluppare i muscoli dei polpacci. Si esegue sollevando i talloni mentre si è in piedi e poi abbassandoli lentamente.")
					.cover("./uploads/defaults/polpacci.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.POLPACCI})
					.build());
			}
			
			if (exerciseRepository.findByName("Crunch").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Crunch")
					.description("Esercizio classico per allenare gli addominali. Si esegue sollevando la parte superiore del corpo verso le ginocchia, contrarre gli addominali e poi ritornare alla posizione di partenza.")
					.cover("./uploads/defaults/crunch.jpeg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.ADDOME})
					.build());
			}
			
			if (exerciseRepository.findByName("Sollevamento gambe sospese").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Sollevamento gambe sospese")
					.description("Esercizio avanzato per gli addominali inferiori. Si esegue appendendosi a una sbarra e sollevando le gambe fino a formare un angolo di 90 gradi con il corpo.")
					.cover("./uploads/defaults/leg_raises_hanging.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.ADDOME, CategoryExercise.FORZA})
					.build());
			}
			
			if (exerciseRepository.findByName("Plank laterale").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Plank laterale")
					.description("Variante del plank tradizionale che coinvolge gli addominali obliqui e i muscoli stabilizzatori della spina dorsale.")
					.cover("./uploads/defaults/side_plank.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.ADDOME, CategoryExercise.FLESSIBILITÀ})
					.build());
			}
			
			if (exerciseRepository.findByName("Sollevamento dei talloni da seduti").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Sollevamento dei talloni da seduti")
					.description("Esercizio specifico per i polpacci. Si esegue seduti sollevando i talloni verso l'alto e poi abbassandoli lentamente.")
					.cover("./uploads/defaults/calf_raises_seated.png")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.POLPACCI})
					.build());
			}
			
			if (exerciseRepository.findByName("Hollow Hold").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Hollow Hold")
					.description("Esercizio che coinvolge gli addominali, la parte bassa della schiena e i muscoli stabilizzatori. Si esegue mantenendo il corpo in una posizione simile a una 'barchetta'.")
					.cover("./uploads/defaults/hollow_body_hold.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.ADDOME, CategoryExercise.FLESSIBILITÀ})
					.build());
			}
			
			if (exerciseRepository.findByName("Crunch obliqui in piedi").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Crunch obliqui in piedi")
					.description("Esercizio per gli addominali obliqui. Si esegue in piedi sollevando un ginocchio e portando il gomito opposto verso di esso.")
					.cover("./uploads/defaults/standing_oblique_crunch.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.ADDOME, CategoryExercise.OBLIQUI})
					.build());
			}

			if (exerciseRepository.findByName("Curl con bilanciere").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Curl con bilanciere")
					.description("Esercizio classico per sviluppare i muscoli dei bicipiti. Si esegue sollevando un bilanciere verso le spalle piegando solo i gomiti.")
					.cover("./uploads/defaults/barbell_curl.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.BICIPITI})
					.build());
			}
			
			if (exerciseRepository.findByName("Pushdown con cavo").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Pushdown con cavo")
					.description("Esercizio per isolare i tricipiti. Si esegue afferrando una barra o un manico collegato a un cavo alto e spingendo verso il basso estendendo i gomiti.")
					.cover("./uploads/defaults/cable_pushdown.avif")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.TRICIPITI})
					.build());
			}
			
			if (exerciseRepository.findByName("Hammer Curl").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Hammer Curl")
					.description("Variante del curl che coinvolge i muscoli dei bicipiti in modo leggermente diverso. Si esegue tenendo i manubri nella posizione neutra (come se si impugnasse un martello).")
					.cover("./uploads/defaults/hammer_curl.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.FORZA, CategoryExercise.BICIPITI})
					.build());
			}
			
			if (exerciseRepository.findByName("Rematore con bilanciere").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Rematore con bilanciere")
					.description("Esercizio fondamentale per lo sviluppo dei muscoli dorsali. Si esegue sollevando un bilanciere verso il petto, mantenendo la schiena dritta e contratta.")
					.cover("./uploads/defaults/barbell_row.jpg")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.DORSALI})
					.build());
			}
			
			if (exerciseRepository.findByName("Lat Pulldown").isEmpty()) {
				exerciseRepository.save(Exercise.builder()
					.name("Lat Pulldown")
					.description("Esercizio per sviluppare i muscoli dorsali. Si esegue seduti su una macchina apposita, afferrando una barra e tirandola verso il petto.")
					.cover("./uploads/defaults/lat_pulldown.webp")
					.shareable(false)
					.category(new CategoryExercise[]{CategoryExercise.DORSALI})
					.build());
			}
		};
	}
}
