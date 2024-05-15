/* tslint:disable */
/* eslint-disable */
import { AllenamentoResponse } from '../models/allenamento-response';
export interface PageResponseAllenamentoResponse {
  content?: Array<AllenamentoResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
