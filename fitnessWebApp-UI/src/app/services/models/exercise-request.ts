/* tslint:disable */
/* eslint-disable */
import { ExerciseCategory } from "../myModels/exerciseCategory";

export interface ExerciseRequest {
  category?: Array<ExerciseCategory>;
  description: string;
  id?: number;
  name: string;
  shareable: boolean;
}
