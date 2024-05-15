/* tslint:disable */
/* eslint-disable */
import { ObbiettivoPeriodo } from "../myModels/obbiettivoPeriodo";

export interface PeriodoRequest {
  data_fine?: string;
  data_inizio: string;
  durata_in_giorni: number;
  id?: number;
  name: string;
  obiettivo: ObbiettivoPeriodo;
  attivo: boolean;
}
