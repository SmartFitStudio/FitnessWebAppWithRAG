/* tslint:disable */
/* eslint-disable */
import { AllenamentoEsercizioResponse } from '../models/allenamento-esercizio-response';
export interface PageResponseAllenamentoEsercizioResponse {
  content?: Array<AllenamentoEsercizioResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
