/* tslint:disable */
/* eslint-disable */
import { PeriodoGiornata } from "../myModels/periodoGiornata";

export interface PeriodoAllenamentoResponse {
  giorno_del_periodo: number;
  id: number;
  id_allenamento: number;
  id_periodo: number;
  periodo_giornata: PeriodoGiornata;
}
