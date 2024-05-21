/* tslint:disable */
/* eslint-disable */
import { ProgressoResponse } from '../models/progresso-response';
export interface PageResponseProgressoResponse {
  content?: Array<ProgressoResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
