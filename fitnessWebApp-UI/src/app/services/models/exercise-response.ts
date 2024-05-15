/* tslint:disable */
/* eslint-disable */
import { ExerciseCategory } from "../myModels/exerciseCategory";

export interface ExerciseResponse {
  category?: Array<ExerciseCategory>;
  cover?: Array<string>;
  creator_username?: string;
  description: string;
  id: number;
  name: string;
  shareable: boolean;

}
