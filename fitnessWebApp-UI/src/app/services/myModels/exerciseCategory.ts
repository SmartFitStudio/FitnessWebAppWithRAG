import { FilterSelector } from "./filterSelector";

export enum ExerciseCategory {
  FORZA = "FORZA",
  RESISTENZA = "RESISTENZA",
  FLESSIBILITA = "FLESSIBILITÀ",
  EQUILIBRIO = "EQUILIBRIO",
  COORDINAZIONE = "COORDINAZIONE",
  AGILITA = "AGILITÀ",
  VELOCITA = "VELOCITÀ",
  POTENZA = "POTENZA",
  PRECISIONE = "PRECISIONE",
  MOBILITA = "MOBILITÀ",
  CARDIO = "CARDIO",
  CALISTHENICS = "CALISTHENICS",
  STRETCHING = "STRETCHING",
  MEDITAZIONE = "MEDITAZIONE",
  RESPIRAZIONE = "RESPIRAZIONE",
  PETTORALI = "PETTORALI",
  DORSALI = "DORSALI",
  SPALLE = "SPALLE",
  DELTOIDI = "DELTOIDI",
  BICIPITI = "BICIPITI",
  TRICIPITI = "TRICIPITI",
  AVAMBRACCI = "AVAMBRACCI",
  ADDUTTORI = "ADDUTTORI",
  QUADRICIPITI = "QUADRICIPITI",
  FLESSORI = "FLESSORI",
  GLUTEI = "GLUTEI",
  POLPACCI = "POLPACCI",
  ADDOME = "ADDOME",
  OBLIQUI = "OBLIQUI",
  FULL_BODY = "FULL_BODY",
  NON_DEFINITO = "NON_DEFINITO",
  ALTRO = "ALTRO"
  }

export function getExerciseCategoryValues(): string[] {
    return Object.values(ExerciseCategory) as string[];
}


export function getExerciseCategories(): FilterSelector[] {

  return [  ExerciseCategory.FORZA,
    ExerciseCategory.RESISTENZA,
    ExerciseCategory.FLESSIBILITA,
    ExerciseCategory.EQUILIBRIO,
    ExerciseCategory.COORDINAZIONE,
    ExerciseCategory.AGILITA,
    ExerciseCategory.VELOCITA,
    ExerciseCategory.POTENZA,
    ExerciseCategory.PRECISIONE,
    ExerciseCategory.MOBILITA,
    ExerciseCategory.CARDIO,
    ExerciseCategory.CALISTHENICS,
    ExerciseCategory.STRETCHING,
    ExerciseCategory.MEDITAZIONE,
    ExerciseCategory.RESPIRAZIONE,
    ExerciseCategory.PETTORALI,
    ExerciseCategory.DORSALI,
    ExerciseCategory.SPALLE,
    ExerciseCategory.DELTOIDI,
    ExerciseCategory.BICIPITI,
    ExerciseCategory.TRICIPITI,
    ExerciseCategory.AVAMBRACCI,
    ExerciseCategory.ADDUTTORI,
    ExerciseCategory.QUADRICIPITI,
    ExerciseCategory.FLESSORI,
    ExerciseCategory.GLUTEI,
    ExerciseCategory.POLPACCI,
    ExerciseCategory.ADDOME,
    ExerciseCategory.OBLIQUI,
    ExerciseCategory.FULL_BODY,
    ExerciseCategory.NON_DEFINITO,
    ExerciseCategory.ALTRO
  ].map((category: string) => {
    return {
      name: category
    };
  });
}