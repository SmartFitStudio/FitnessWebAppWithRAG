import { Injectable, OnDestroy } from '@angular/core';
import { Observable, catchError, flatMap, forkJoin, map, mergeMap, of } from 'rxjs';
import { AllenamentoEsercizioRequest, AllenamentoEsercizioResponse, AllenamentoRequest, ExerciseResponse } from "../../../../services/models";
import { ExerciseService, TrainExerciseService, TrainService } from "../../../../services/services";


/*
Questo servizio permette di gestire quanto concerne un allenamento, quindi la sua creazione, modifica e visualizzazione e visualizzazione degli esercizi che lo compongono.
E un servizio che utilizzato per la visualizzazione dei dettagli per l'allenamento e quindi il recupero delle informazioni necessarie per la visualizzazione,
inoltre viste le operazioni comuni si occupa anche della gestione del managing degli allenamenti
*/
@Injectable({
    providedIn: 'root'
})
export class TrainingManagerService implements OnDestroy{
    private _train: AllenamentoRequest = {
        description: '',
        durata_in_ore: 0,
        name: ''
    };
    private _trainingExerciseRequests: Array<AllenamentoEsercizioRequest> = [];
    private _trainingExercisesResponse: Array<AllenamentoEsercizioResponse> = [];
    private _exercisesResponse: Array<ExerciseResponse> = [];

    constructor(private exerciseService: ExerciseService,
        private trainingService: TrainService,
        private training_exercise_service: TrainExerciseService
    ) {
    }

    ngOnDestroy(): void {
        this.clearInfo();
        console.log("destroyed");
    }

    public setInfoByTrainingId$(allenamento_id: number): Observable<any> {
        return this.trainingService.findAllenamentoById({ 'allenamento-id': allenamento_id })
          .pipe(
            mergeMap((allenamento) => {
              this._train.id = allenamento.id;
              this._train.name = allenamento.name;
              this._train.description = allenamento.description;
              this._train.durata_in_ore = allenamento.durata_in_ore;

              return this.getTrainingExercises$(allenamento.name);
            }),
            catchError((error) => {throw(error)})
          );
      }
      /*
      mentre i due mergeMap sono concettualmente sequenziali, ciò non implica che l'intero processo sia sincrono. Le operazioni all'interno di ciascun mergeMap possono essere asincrone, ma verranno eseguite nell'ordine in cui sono definite nel flusso di osservabili.
      */
      private getTrainingExercises$ (allenamentoNome: string): Observable<any> {
        return this.training_exercise_service.findByAllenamentoNomeNoPagination({ 'allenamento-nome': allenamentoNome })
          .pipe(
            mergeMap((esercizi) => {
              this._trainingExercisesResponse = esercizi;
              this.mapTrainingExerciseResponseToRequest();

              const exerciseRequests = [];
              for (const exercise of this._trainingExerciseRequests) {
                exerciseRequests.push(this.exerciseService.findExerciseById({ 'exercise-id': exercise.id_esercizio }));
              }

              return forkJoin(exerciseRequests);//iene utilizzato forkJoin per eseguire tutte queste richieste in parallelo. forkJoin restituisce un osservabile che emetterà un array con i risultati di tutte le richieste quando saranno complete.
            }),
            mergeMap((exercises) => {
              this._exercisesResponse = exercises;
              return of(exercises);
            }),
            catchError((error) => {throw(error)})
          );
      }


    //La funzione mi serve nel caso stia facendo un update di un allenamento, gli esercizi ottenuti devo trasformarli in esercizi request
    private mapTrainingExerciseResponseToRequest() {
        if (this._trainingExercisesResponse) {
            for (const trainingExercise of this._trainingExercisesResponse) {
                this._trainingExerciseRequests.push({
                    id_esercizio: trainingExercise.esercizio_id as number,
                    id_allenamento: trainingExercise.allenamento_id as number,
                    index: trainingExercise.index as number,
                    serie: trainingExercise.serie as number,
                    ripetizioni: trainingExercise.ripetizioni as number,
                    recupero: trainingExercise.recupero as number,
                });
            }
        }
    }



    get train(): AllenamentoRequest {
        return this._train;
    }

    get trainingExercisesRequest(): AllenamentoEsercizioRequest[] {
            return this._trainingExerciseRequests;
    }
    get trainingExercisesResponse(): AllenamentoEsercizioResponse[] {
        return this._trainingExercisesResponse;
    }

    get exercisesResponse(): Array<ExerciseResponse> {
        return this._exercisesResponse;
    }

    public calcoloDurata(): number {
        //TO DO
        return 0;
    }

    public setTrainName(name: string) {
        this._train.name = name;
    }

    public setTrainDescription(description: string) {
        this._train.description = description;
    }
    public setTrainDuration(duration: number) {
        this._train.durata_in_ore = duration;
    }

    public clearInfo() {
        this._train = {
            description: '',
            durata_in_ore: 0,
            name: ''
        };
        this._trainingExerciseRequests = [];
        this._trainingExercisesResponse = [];
        this._exercisesResponse = [];
    }

    private updateTrainingExerciseRequestId(id: number) {
        for (let i = 0; i < this._trainingExerciseRequests.length; i++) {
            this._trainingExerciseRequests[i].id_allenamento = id;
        }
    }

    public getTrainingExerciseRequestById(id: number): AllenamentoEsercizioRequest[] | undefined {
        return this._trainingExerciseRequests.filter(exercise => exercise.id_esercizio === id);
    }

    public getExerciseResponseById(id: number): ExerciseResponse | null {
        return this._exercisesResponse.find(exercise => exercise.id === id) || null;
    }

    public addExerciseToTrain(allenamentoEsercizioRequest: AllenamentoEsercizioRequest) {
        this.addExerciseToExercices(allenamentoEsercizioRequest.id_esercizio);
        allenamentoEsercizioRequest.id_allenamento = this.train.id? this.train.id : -1;
        allenamentoEsercizioRequest.index = this._trainingExerciseRequests.length;
        this._trainingExerciseRequests.push(allenamentoEsercizioRequest);
    }

    private addExerciseToExercices(id: number) {
        if (this._exercisesResponse.find(exercise => exercise.id === id)) {
            return;
        }
        //recupero l'esercizio
        this.exerciseService.findExerciseById({
            'exercise-id': id as number
        }).subscribe({
            next: (exercise) => {
                this._exercisesResponse.push(exercise);
            },
            error: (error) => {
                console.log(error); //TODO: gestire l'errore
            }
        });
    }

    //funzione che mi permette di aggiornare gli indici degli esercizi sulla base della posizione nell'array
    private setAllIndexesByPosition() {
        for (let i = 0; i < this._trainingExerciseRequests.length; i++) {
            this._trainingExerciseRequests[i].index = i;
        }
    }

    //sposta in alto di uno l'esercizio, scambiandolo con quello precedente e aggiornando gli indici
    public goUp(index: number) {
        if (index > 0 && index < this._trainingExerciseRequests.length) {
            let temp = this._trainingExerciseRequests[index];
            this._trainingExerciseRequests[index] = this._trainingExerciseRequests[index - 1];
            this._trainingExerciseRequests[index - 1] = temp;
            this.setAllIndexesByPosition();

        }
    }
    //sposta in basso di uno l'esercizio, scambiandolo con quello successivo e aggiornando gli indici

    public goDown(index: number) {
        if (index >= 0 && index <= this._trainingExerciseRequests.length - 2) {
            let temp = this._trainingExerciseRequests[index];
            this._trainingExerciseRequests[index] = this._trainingExerciseRequests[index + 1];
            this._trainingExerciseRequests[index + 1] = temp;
            this.setAllIndexesByPosition();
        }
    }


    public removeExerciseToTrain(index: number) {
        if (index >= 0 && index < this._trainingExerciseRequests.length) {
            this._trainingExerciseRequests.splice(index, 1);
        }
        this.updateExerciseIndexAfterRemovingIndex(index);
    }

    private updateExerciseIndexAfterRemovingIndex(lastRemovedIndex: number) {
        if (lastRemovedIndex >= 0 && lastRemovedIndex <= this._trainingExerciseRequests.length) {
            for (let i = lastRemovedIndex; i < this._trainingExerciseRequests.length; i++) {
                if (this._trainingExerciseRequests[i].index) {
                    this._trainingExerciseRequests[i].index = i;
                }
            }
        }
    }

    /*combination delle richieste tramite forkJoin: Una volta create tutte le richieste per gli esercizi, vengono raccolte in un array di Observable. Questi Observable rappresentano ciascuna delle richieste di salvataggio degli esercizi. Utilizzando l'operatore forkJoin, tutte queste richieste vengono combinate in un unico Observable. Questo Observable emetterà un valore solo quando tutte le richieste di salvataggio degli esercizi saranno state completate. */
    public saveTraining$(): Observable<any> {
        return this.trainingService.saveAllenamento({ body: this._train })
          .pipe(
            mergeMap((trainingResponse) => {
              this.updateTrainingExerciseRequestId(trainingResponse.id);
              const trainingExerciseRequests = this._trainingExerciseRequests.map(
                (request) => this.training_exercise_service.saveAllenamentoEsercizio({ body: request })
              );
              return forkJoin(trainingExerciseRequests);
            }),
            map(() => {
              // No need to return any specific data, just indicate completion
              return;
            }),
            catchError((error) => {throw(error)})
          );
      }
}
