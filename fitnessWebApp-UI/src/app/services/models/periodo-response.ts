/* tslint:disable */
/* eslint-disable */
import { ObbiettivoPeriodo } from "../myModels/obbiettivoPeriodo";

export interface PeriodoResponse {
  creator_username?: string;
  data_fine?: string;
  data_inizio: string;
  durata_in_giorni: number;
  id: number;
  name: string;
  obiettivo: ObbiettivoPeriodo;
  attivo: boolean;
}
