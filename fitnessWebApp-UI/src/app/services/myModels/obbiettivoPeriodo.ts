export enum ObbiettivoPeriodo {
    DIMAGRIMENTO = 'DIMAGRIMENTO',
    DEFINIZIONE = 'DEFINIZIONE',
    MASSA = 'MASSA',
    FORZA = 'FORZA',
    RESISTENZA = 'RESISTENZA',
    NON_DEFINITO = 'NON_DEFINITO'
  }


export function getObbiettivoPeriodoValues(): string[] {
    return Object.values(ObbiettivoPeriodo) as string[];
}
