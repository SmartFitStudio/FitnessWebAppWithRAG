/* tslint:disable */
/* eslint-disable */
import { ExerciseResponse } from '../models/exercise-response';
export interface PageResponseExerciseResponse {
  content?: Array<ExerciseResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
