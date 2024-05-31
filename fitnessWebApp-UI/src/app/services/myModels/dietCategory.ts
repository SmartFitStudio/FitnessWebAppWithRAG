import { FilterSelector } from "./filterSelector";

export enum DietCategory {
  VEGETARIANA = "VEGETARIANA",
  VEGANA = "VEGANA",
  ONNIVORA = "ONNIVORA",
  CARNIVORA = "CARNIVORA",
  PESCETARIANA = "PESCETARIANA",
  CHETOGENICA = "CHETOGENICA",
  MEDITERRANEA = "MEDITERRANEA",
  BASSI_CARBOIDRATI = "BASSI_CARBOIDRATI",
  BASSI_GRASSI = "BASSI_GRASSI",
  SENZA_GLUTINE = "SENZA_GLUTINE",
  SENZA_LATTICINI = "SENZA_LATTICINI",
  ALTO_CONTENUTO_PROTEICO = "ALTO_CONTENUTO_PROTEICO"
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

export function getDietCategories(): {name:DietCategory,label:string}[] {
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
  ].map((category: DietCategory) => {
    return {
      name: category,
      label : category.replace(/_/g, ' ')
    };
  });
}
