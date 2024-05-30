import { FilterSelector } from "./filterSelector";

export enum DietCategory {
  VEGETARIANA = "VEGETARIANA",
  VEGANA = "VEGANA",
  ONNIVORA = "ONNIVORA",
  CARNIVORA = "CARNIVORA",
  PESCETARIANA = "PESCETARIANA",
  CHETOGENICA = "CHETOGENICA",
  MEDITERRANEA = "MEDITERRANEA",
  BASSI_CARBOIDRATI = "BASSI CARBOIDRATI",
  BASSI_GRASSI = "BASSI GRASSI",
  SENZA_GLUTINE = "SENZA GLUTINE",
  SENZA_LATTICINI = "SENZA LATTICINI",
  ALTO_CONTENUTO_PROTEICO = "ALTO CONTENUTO PROTEICO"
}
export function getAllDietCategories(): DietCategory[] {
  return [
    DietCategory.VEGETARIANA,
    DietCategory.VEGANA,
    DietCategory.ONNIVORA,
    DietCategory.CARNIVORA,
    DietCategory.PESCETARIANA,
    DietCategory.CHETOGENICA,
    DietCategory.MEDITERRANEA,
    DietCategory.BASSI_CARBOIDRATI,
    DietCategory.BASSI_GRASSI,
    DietCategory.SENZA_GLUTINE,
    DietCategory.SENZA_LATTICINI,
    DietCategory.ALTO_CONTENUTO_PROTEICO
  ];
  
}


export function getDietCategoryValues(): string[] {
    return Object.values(DietCategory) as string[];
}

export function getDietCategories(): FilterSelector[] {
  return [
    DietCategory.VEGETARIANA,
    DietCategory.VEGANA,
    DietCategory.ONNIVORA,
    DietCategory.CARNIVORA,
    DietCategory.PESCETARIANA,
    DietCategory.CHETOGENICA,
    DietCategory.MEDITERRANEA,
    DietCategory.BASSI_CARBOIDRATI,
    DietCategory.BASSI_GRASSI,
    DietCategory.SENZA_GLUTINE,
    DietCategory.SENZA_LATTICINI,
    DietCategory.ALTO_CONTENUTO_PROTEICO
  ].map((category: string) => {
    return {
      name: category
    };
  });
}
