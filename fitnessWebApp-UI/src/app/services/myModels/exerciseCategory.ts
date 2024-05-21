import { FilterSelector } from "./filterSelector";

export enum ExerciseCategory {
    ABS = 'ABS',
    ARMS = 'ARMS',
    BACK = 'BACK',
    CALVES = 'CALVES',
    CHEST = 'CHEST',
    LEGS = 'LEGS',
    CORE = 'CORE',
    SHOULDERS = 'SHOULDERS',
    CARDIO = 'CARDIO',
    FULL_BODY = 'FULL_BODY',
    STRETCHING = 'STRETCHING',
    YOGA = 'YOGA',
    PILATES = 'PILATES',
    CROSSFIT = 'CROSSFIT',
    FUNCTIONAL = 'FUNCTIONAL',
    POWERLIFTING = 'POWERLIFTING',
    OLYMPIC_LIFTING = 'OLYMPIC_LIFTING',
    STRONGMAN = 'STRONGMAN',
    BODYBUILDING = 'BODYBUILDING',
    AEROBICS = 'AEROBICS',
    ZUMBA = 'ZUMBA',
    DANCE = 'DANCE',
    MARTIAL_ARTS = 'MARTIAL_ARTS',
    OTHER = 'OTHER',
    NON_DEFINITO = 'NON_DEFINITO'
  }

export function getExerciseCategoryValues(): string[] {
    return Object.values(ExerciseCategory) as string[];
}


export function getExerciseCategories(): FilterSelector[] {

  return [ExerciseCategory.ABS,
          ExerciseCategory.ARMS,
          ExerciseCategory.BACK,
          ExerciseCategory.CALVES,
          ExerciseCategory.CHEST,
          ExerciseCategory.LEGS,
          ExerciseCategory.CORE,
          ExerciseCategory.SHOULDERS,
          ExerciseCategory.CARDIO,
          ExerciseCategory.FULL_BODY,
          ExerciseCategory.STRETCHING,
          ExerciseCategory.YOGA,
          ExerciseCategory.PILATES,
          ExerciseCategory.CROSSFIT,
          ExerciseCategory.FUNCTIONAL,
          ExerciseCategory.POWERLIFTING,
          ExerciseCategory.OLYMPIC_LIFTING,
          ExerciseCategory.STRONGMAN,
          ExerciseCategory.BODYBUILDING,
          ExerciseCategory.AEROBICS,
          ExerciseCategory.ZUMBA,
          ExerciseCategory.DANCE,
          ExerciseCategory.MARTIAL_ARTS,
          ExerciseCategory.OTHER,
          ExerciseCategory.NON_DEFINITO
  ].map((category: string) => {
    return {
      name: category
    };
  });
}