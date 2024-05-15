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