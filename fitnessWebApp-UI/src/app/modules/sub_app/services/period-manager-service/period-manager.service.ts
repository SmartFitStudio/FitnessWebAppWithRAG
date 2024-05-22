import { Injectable, OnDestroy } from '@angular/core';
import { EMPTY, Observable, Subscription, catchError, concat, concatMap, forkJoin, map, merge, mergeMap } from 'rxjs';
import { AllenamentoResponse, PeriodoAllenamentoRequest, PeriodoAllenamentoResponse, PeriodoRequest, PeriodoResponse } from '../../../../services/models';
import { ObbiettivoPeriodo } from '../../../../services//myModels/obbiettivoPeriodo';
import { PeriodoGiornata } from '../../../../services//myModels/periodoGiornata';
import { PeriodTrainingService, PeriodsService, TrainService } from '../../../../services/services';
import { ScheduleEvent } from '../models/scheduleEvent';

@Injectable({
  providedIn: 'root'
})
export class PeriodManagerService implements OnDestroy {
  private periodoAllenamentoRequest_list: PeriodoAllenamentoRequest[] = [];
  private initial_periodoAllenamentoRequest_list: PeriodoAllenamentoRequest[] = []; //Lista degli allenamenti associati al periodo, al momento del recupero dei dati, mi serve per poter eliminare solo quelli tolti.
  private allenamento_list: AllenamentoResponse[] = []; //Lista degli allenamenti associati al periodo
  private active_periodo: PeriodoResponse | undefined | null = undefined;   //active_periodo = undefined; //Se non ho ancora recuperato i dati
                                                                            //active_periodo = null; //Se non c'è un periodo attivo
                                                                            //active_periodo = response; //Se c'è un periodo attivo
  private subscription_active_period?: Subscription;

  private periodoRequest: PeriodoRequest = {
    id: undefined,
    name: "",
    obiettivo: ObbiettivoPeriodo.NON_DEFINITO,
    durata_in_giorni: 7,
    data_inizio: "",
    data_fine: "",
    attivo: false
  };

  constructor(private allenamentoService: TrainService,
    private periodoService: PeriodsService,
    private periodoAllenamentoService: PeriodTrainingService) { }

  ngOnDestroy(): void {
    if (this.subscription_active_period)
      this.subscription_active_period.unsubscribe();
  }

  set periodoAttivo(value: boolean) {
    if (this.active_periodo === undefined) { // Se è nullo vuol dire che non lhò ancora recuperato
      this.subscription_active_period = this.getActivePeriod$().subscribe(
        {
          complete: () => {
            if (value === false || this.activePeriod === null) {
              this.periodoRequest.attivo = value;
            }
          }
        }
      );
    } else {
      if (value === false || this.activePeriod === null) { //altrimenti guardo se il valore è false, va sempre bene, altrimenti controllo se c'è un periodo attivo
        this.periodoRequest.attivo = value;
      }
    }
  }

  public setInfoByPeriodName$(periodo_id: number): Observable<any> {
    return this.periodoService.findByAuthenticatedUserAndId({ 'periodo-id': periodo_id })
      .pipe(
        mergeMap((response) => {
          this.periodoRequest.id = response.id;
          this.periodoRequest.name = response.name;
          this.periodoRequest.obiettivo = response.obiettivo;
          this.periodoRequest.durata_in_giorni = response.durata_in_giorni;
          this.periodoRequest.data_inizio = response.data_inizio;
          this.periodoRequest.data_fine = response.data_fine;
          this.periodoRequest.attivo = response.attivo;
          return forkJoin([
            this.getTrainingPeriod$(),
            this.getActivePeriod$()
          ]);
        })
      );
  }

  private getTrainingPeriod$(): Observable<any> {
    if (!this.periodoRequest.id) {
      return EMPTY;
    }
    return this.periodoAllenamentoService.findAllAuthUserPeriodoAllenamentoByPeriodoIdNoPagination({ 'periodo-id': this.periodoRequest.id })
      .pipe(
        mergeMap((response) => {
          this.periodoAllenamentoRequest_list = response.map((value) => this.mapPeriodoAllenamentoResponseToPeriodoAllenamentoRequest(value));
          this.initial_periodoAllenamentoRequest_list = this.periodoAllenamentoRequest_list.map((training) => ({ ...training })); //mi serve per poter eliminare solo quelli tolti.
          return this.getTraining$();
        })
      );
  }

  private getTraining$(): Observable<any> {
    const trainingRequests = this.periodoAllenamentoRequest_list.map((periodoAllenamentoRequest) =>
      this.allenamentoService.findAllenamentoById({ 'allenamento-id': periodoAllenamentoRequest.id_allenamento })
    );
    return forkJoin(trainingRequests)
      .pipe(
        map((response) => {
          this.allenamento_list = response;
          return response;
        })
      );
  }

  //ricorda
  //active_periodo = undefined; //Se non ho ancora recuperato i dati
  //active_periodo = null; //Se non c'è un periodo attivo
  //active_periodo = response; //Se c'è un periodo attivo
  public getActivePeriod$(): Observable<any> {
    return this.periodoService.findAuthenticatedUserActivePeriodo()
      .pipe(
        map((response) => {
          if (!response) { //Se non c'è un periodo attivo
            this.active_periodo = null;
          } else {
            //Se non sto facendo una modifica allora di sicuro cè un periodo attivo arrivati a questo punto
            //oppure se sto facendo una modifica e il periodo attivo è diverso da quello che sto modificando
            if (!this.periodoRequest.id || response.id != this.periodoRequest.id) { 
              this.active_periodo = response;
            } else {
              this.active_periodo = null;
            }
          }
          return response;
        })
      );
  }

  private mapPeriodoAllenamentoResponseToPeriodoAllenamentoRequest(periodoAllenamentoRequest: PeriodoAllenamentoResponse): PeriodoAllenamentoRequest {
    return {
      id: periodoAllenamentoRequest.id,
      id_periodo: periodoAllenamentoRequest.id_periodo,
      id_allenamento: periodoAllenamentoRequest.id_allenamento,
      giorno_del_periodo: periodoAllenamentoRequest.giorno_del_periodo,
      periodo_giornata: periodoAllenamentoRequest.periodo_giornata
    };
  }
  private mapPeriodoAllenamentoRequestToPeriodoAllenamentoResponse(periodoAllenamentoRequest: PeriodoAllenamentoRequest): PeriodoAllenamentoResponse {
    return {
      id: periodoAllenamentoRequest.id as number,
      id_periodo: periodoAllenamentoRequest.id_periodo,
      id_allenamento: periodoAllenamentoRequest.id_allenamento,
      giorno_del_periodo: periodoAllenamentoRequest.giorno_del_periodo,
      periodo_giornata: periodoAllenamentoRequest.periodo_giornata
    };
  }

  /**
   * Ottieni gli eventi da visualizzare nel calendario per il periodo di allenamento.
   * 
   * @param max_iteration_scheduling Indica il numero di cicli da fare per ottenere gli eventi a partire dalla data ATTUALE!
   * @returns 
   */
  public getScheduleEvents(max_iteration_scheduling: number): ScheduleEvent[] {
    const events: ScheduleEvent[] = [];
    let id = 0;
    let iteration_counter = 0;
    const today = new Date();
    let dataInizio = new Date(this.periodoRequest.data_inizio);

    for (let j = 0; j < max_iteration_scheduling; j++) {
      for (let i = 0; i < this.periodoAllenamentoRequest_list.length; i++) {
        dataInizio = new Date(this.periodoRequest.data_inizio);

        // Impostare il fuso orario a UTC+1 (Roma)
        dataInizio.setTime(dataInizio.getTime() + (1 * 60 * 60 * 1000));
        // Ottenere la data senza l'orario
        dataInizio.setDate(dataInizio.getDate() + (this.periodoAllenamentoRequest_list[i].giorno_del_periodo + this.periodoRequest.durata_in_giorni * j));
        dataInizio.setHours(this.gerOrarioInizio(this.periodoAllenamentoRequest_list[i].periodo_giornata));

        if (this.periodoRequest.data_fine && dataInizio > new Date(this.periodoRequest.data_fine)) {
          j = max_iteration_scheduling; //Esci dal ciclo
          break;
        }
        //Calcolo della data di fine
        let datafine = new Date(dataInizio)
        let durata_allenamento = this.getAllenamentoById(this.periodoAllenamentoRequest_list[i].id_allenamento)?.durata_in_ore;
        datafine.setHours(dataInizio.getHours() + (durata_allenamento ? durata_allenamento : 1));

        let allenamento = this.getAllenamentoById(this.periodoAllenamentoRequest_list[i].id_allenamento);
        events.push({
          Id: id++,
          Subject: allenamento && allenamento.name ? allenamento.name : "",
          StartTime: dataInizio,
          EndTime: datafine,
          IsAllDay: false,
        });
        /*
      Il comportamento che voglio è ottenere N cicli ma a partire dalla data di oggi, 
      quindi se la data di inizio è minore della data di oggi, decremento j
       per ottenere N cicli a partire dalla data di oggi.
      */
      }
     /* if (dataInizio >= today) {
        iteration_counter = iteration_counter + 1;
      }
      if (this.periodoRequest.data_fine && dataInizio <= new Date(this.periodoRequest.data_fine)) {
        break;
      }*/
    }
    console.log("finitoooooooo");
    return events;
  }

  /*
public getScheduleEvents(max_iteration_scheduling: number): ScheduleEvent[] {
    const events: ScheduleEvent[] = [];
    let id = 0;
    const today = new Date();
    let dataInizio = new Date(this.periodoRequest.data_inizio);

    // Impostare il fuso orario a UTC+1 (Roma)
    const oneHourInMillis = 1 * 60 * 60 * 1000;
    dataInizio.setTime(dataInizio.getTime() + oneHourInMillis);

    let j = 0;
    let iterationsCount = 0;

    // Loop over all iterations until max_iteration_scheduling is reached
    while (iterationsCount < max_iteration_scheduling) {
        for (let i = 0; i < this.periodoAllenamentoRequest_list.length; i++) {
            let eventDate = new Date(this.periodoRequest.data_inizio);
            eventDate.setTime(eventDate.getTime() + oneHourInMillis);
            eventDate.setDate(eventDate.getDate() + (this.periodoAllenamentoRequest_list[i].giorno_del_periodo + this.periodoRequest.durata_in_giorni * j));
            eventDate.setHours(this.gerOrarioInizio(this.periodoAllenamentoRequest_list[i].periodo_giornata));

            if (this.periodoRequest.data_fine && eventDate > new Date(this.periodoRequest.data_fine)) {
                iterationsCount = max_iteration_scheduling; // Exit the loop
                break;
            }

            // Calcolo della data di fine
            let datafine = new Date(eventDate);
            let durata_allenamento = this.getAllenamentoById(this.periodoAllenamentoRequest_list[i].id_allenamento)?.durata_in_ore;
            datafine.setHours(eventDate.getHours() + (durata_allenamento ? durata_allenamento : 1));

            let allenamento = this.getAllenamentoById(this.periodoAllenamentoRequest_list[i].id_allenamento);
            events.push({
                Id: id++,
                Subject: allenamento && allenamento.name ? allenamento.name : "",
                StartTime: eventDate,
                EndTime: datafine,
                IsAllDay: false,
            });

            // Increment the iterations count only if the event date is after today
            if (eventDate >= today) {
                iterationsCount++;
            }
        }
        j++;
    }
    return events;
}  */

  public addAllenamentoToPeriodo(allenamento: PeriodoAllenamentoRequest) {
    if (allenamento.id_allenamento) {
      allenamento.id_periodo = this.periodoRequest.id as number;
      this.periodoAllenamentoRequest_list.push(allenamento);
      this.updateListaAllenamenti(allenamento.id_allenamento);
    }
  }

  public removeAllenamentoFromPeriodo(allenamento: PeriodoAllenamentoRequest) {
    this.periodoAllenamentoRequest_list = this.periodoAllenamentoRequest_list.filter((value) => value !== allenamento);
  }

  public removeAllenamentoFromPeriodoByDayAndPeriod(day: number, periodo: PeriodoGiornata) {
    this.periodoAllenamentoRequest_list = this.periodoAllenamentoRequest_list.filter((value) => value.giorno_del_periodo !== day || value.periodo_giornata !== periodo);
  }

  public getAllenamentoById(id_allenamento: number): AllenamentoResponse | undefined {
    return this.allenamento_list.find((value) => value.id === id_allenamento);
  }

  private updateListaAllenamenti(id_allenamento: number) {
    if (!this.allenamento_list.find((value) => value.id === id_allenamento)) {
      this.allenamentoService.findAllenamentoById({
        "allenamento-id": id_allenamento
      }).subscribe({
        next: (response) => {
          this.addAllenamento(response);
        }
      });
    }
  }

  private addAllenamento(allenamento: AllenamentoResponse) {
    this.allenamento_list.push(allenamento);
  }

  private updatePeriodId(id: number) {
    this.periodoRequest.id = id;
    for (let i = 0; i < this.periodoAllenamentoRequest_list.length; i++) {
      this.periodoAllenamentoRequest_list[i].id_periodo = id;
    }
  }

  public getAllenamentiPeriodoByDay(day: number): PeriodoAllenamentoRequest[] {
    return this.periodoAllenamentoRequest_list.filter((value) => value.giorno_del_periodo === day);
  }

  private fillEmptyData() {
    if (!this.periodoRequest.data_inizio) {
      const tomorrow = new Date()
      // Set date to current date plus 1 day
      tomorrow.setDate(tomorrow.getDate() + 1)
      this.periodoRequest.data_inizio = tomorrow.toISOString().split('T')[0];
    }
    if (!this.periodoRequest.obiettivo)
      this.periodoRequest.obiettivo = ObbiettivoPeriodo.NON_DEFINITO;
  }

  /*
  This function defines an observable (savePeriodo$()) responsible for saving period data along with associated training periods within the specified duration. The observable completes when the saving process is finished, either successfully or with an error.
  */
  public savePeriodo$(): Observable<any> {
    this.fillEmptyData();
    const toSaveTraining = this.periodoAllenamentoRequest_list.filter(
      (training) => training.giorno_del_periodo <= this.periodoRequest.durata_in_giorni
    );

    let obs2$ = this.periodoService.savePeriodo({ body: this.periodoRequest }).pipe(map((response) => { this.updatePeriodId(response.id) }));

    let obs1$ = this.delete_allenamentoPeriodo$(this.getTrainingPeriod_Ids_to_delete());
    let obs3$ = toSaveTraining.length === 0 ? EMPTY : forkJoin(
      toSaveTraining.map((training) => this.periodoAllenamentoService.savePeriodoAllenamento({ body: training })));

    return concat(obs1$, obs2$, obs3$);

  }


  /*
  La funzione filtra gli oggetti che sono presenti nella lista iniziale ma non nella lista aggiornata. Poi, estrae gli ID degli oggetti filtrati.
  */
  private getTrainingPeriod_Ids_to_delete(): number[] {
    return this.initial_periodoAllenamentoRequest_list
      .filter((value) => !this.periodoAllenamentoRequest_list.find((value2) => value.id === value2.id))
      .map((value) => value.id as number);
  }

  private delete_allenamentoPeriodo$(ids: number[]): Observable<any> {
    if (ids.length === 0) {
      return EMPTY;
    }
    const requests = ids.map((id) => this.periodoAllenamentoService.deletePeriodoAllenamento({ 'periodo-allenamento-id': id }));
    return forkJoin(requests);
  }
  public disableActivePeriodo$(): Observable<any> {
    if (this.active_periodo) {
      this.active_periodo.attivo = false;
      return this.periodoService.disableAuthenticatedUserActivePeriodo()
        .pipe(
          map(() => {
            this.active_periodo = undefined;
            return;
          })
        );
    } else {
      return EMPTY;
    }
  }


  //BOILERPLATE CODE

  /*
  La funzione restituisce l'orario di inizio dell'allenamento in base al periodo della giornata.
  */
  private gerOrarioInizio(periodo_giornata: PeriodoGiornata): number {
    switch (periodo_giornata) {
      case PeriodoGiornata.MATTINA:
        return 8;
      case PeriodoGiornata.POMERIGGIO:
        return 14;
      case PeriodoGiornata.SERA:
        return 20;
      default:
        return 8;
    }
  }

  get allenamentiPeriodo(): PeriodoAllenamentoRequest[] {
    return this.periodoAllenamentoRequest_list.filter((value) => value.giorno_del_periodo <= this.periodoRequest.durata_in_giorni);
  }

  get periodoId(): number | undefined {
    return this.periodoRequest.id;
  }

  get periodoName(): string {
    return this.periodoRequest.name;
  }

  get periodoObiettivo(): ObbiettivoPeriodo {
    return this.periodoRequest.obiettivo || ObbiettivoPeriodo.NON_DEFINITO;
  }

  get periodoDurataInGiorni(): number {
    return this.periodoRequest.durata_in_giorni;
  }

  get periodoDataInizio(): string {
    return this.periodoRequest.data_inizio;
  }

  get periodoDataFine(): string {
    return this.periodoRequest.data_fine || "";
  }
  get allenamentoPeriodoResponseList(): PeriodoAllenamentoResponse[] {
    return this.periodoAllenamentoRequest_list.map((value) => this.mapPeriodoAllenamentoRequestToPeriodoAllenamentoResponse(value));
  }

  set periodoName(value: string) {
    this.periodoRequest.name = value;
  }

  set periodoObiettivo(value: ObbiettivoPeriodo) {
    this.periodoRequest.obiettivo = value;
  }

  //Durata del ciclo!
  set periodoDurataInGiorni(value: number) {
    this.periodoRequest.durata_in_giorni = value;
  }

  set periodoDataInizio(value: string) {
    this.periodoRequest.data_inizio = value;
  }

  set periodoDataFine(value: string) {
    this.periodoRequest.data_fine = value;
  }

  get periodoAttivo(): boolean {
    return this.periodoRequest.attivo;
  }
  get activePeriod(): PeriodoResponse | undefined | null { //Se non ho ancora recuperato i dati ritorno undefined
    return this.active_periodo;
  }
  public is_there_active_period(): boolean {
    return this.active_periodo ? true : false;
  }
}
