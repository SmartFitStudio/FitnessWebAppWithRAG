/* tslint:disable */
/* eslint-disable */
import { DietCategory } from "../myModels/dietCategory";
export interface DietBase {
  categorie?: Array<DietCategory>;
  descrizione: string;
  titolo: string;
}
