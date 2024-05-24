import { Injectable, OnDestroy } from '@angular/core';
import { EMPTY, Observable, catchError, concat, concatMap, flatMap, forkJoin, map, mergeMap, of, tap } from 'rxjs';
import { AllenamentoEsercizioRequest, AllenamentoEsercizioResponse, AllenamentoRequest, ExerciseResponse, WorkoutResponse } from "../../../../services/models";
import { ExerciseService, TrainExerciseService, TrainService } from "../../../../services/services";


/*
Questo servizio permette di gestire quanto concerne un allenamento, quindi la sua creazione, modifica e visualizzazione e visualizzazione degli esercizi che lo compongono.
E un servizio che utilizzato per la visualizzazione dei dettagli per l'allenamento e quindi il recupero delle informazioni necessarie per la visualizzazione,
inoltre viste le operazioni comuni si occupa anche della gestione del managing degli allenamenti
*/
@Injectable({
    providedIn: 'root'
})
export class TrainingManagerService {
    private _train: AllenamentoRequest = {
        description: '',
        durata_in_ore: 0,
        name: ''
    };
    /*
        per far funzionare l'ordinamento (go up e do down) l'indice degli esercizi (ovvero oggetti) deve rispecchiare l'ordine dell'array
    */
    private _trainingExerciseRequests: AllenamentoEsercizioRequest[] = [];
    //la lista degli esercizi che compongono l'allenamento al caricamento, serve per eliminare gli esercizi che non sono più presenti
    //dopo le modifiche
    private _starting_trainingExerciseRequests: AllenamentoEsercizioRequest[] = [];
    /*
        Non rispetta il separation of concern. Ma qui tengo le risposte dei TrainingExercise da visualizzare e ottenute dal server
        tipo in training details
    */
    private _trainingExercisesResponse: AllenamentoEsercizioResponse[] = [];
    /*
        Lista degli esercizi -> con info complete per la visualizzazione
    */
    private _exercisesResponse: ExerciseResponse[] = [];

    constructor(private exerciseService: ExerciseService,
        private trainingService: TrainService,
        private training_exercise_service: TrainExerciseService
    ) {
    }

    public setInfoByTrainingId$(allenamento_id: number): Observable<any> {
        return this.trainingService.findAllenamentoById({ 'allenamento-id': allenamento_id })
            .pipe(
                mergeMap((allenamento) => {
                    this._train.id = allenamento.id;
                    this._train.name = allenamento.name;
                    this._train.description = allenamento.description;
                    this._train.durata_in_ore = allenamento.durata_in_ore;

                    return this.getTrainingExercises$(allenamento.id);
                }),
                catchError((error) => { throw (error) })
            );
    }

    public setInfoFromWorkoutResponse(workoutResponse: WorkoutResponse) {
        for (let i = 0; i < workoutResponse.esercizi.length; i++) {
            this.addExerciseToTrain({
                id_allenamento: -1,
                id_esercizio: workoutResponse.esercizi[i].id,
                ripetizioni: workoutResponse.esercizi[i].ripetizioni,
                serie: workoutResponse.esercizi[i].serie,
                recupero: workoutResponse.esercizi[i].recupero,
                index: i
            });
        }
    }

    public addExerciseToTrain(allenamentoEsercizioRequest: AllenamentoEsercizioRequest) {
        this.addExerciseToExercices(allenamentoEsercizioRequest.id_esercizio);
        allenamentoEsercizioRequest.id_allenamento = this.train.id ? this.train.id : -1;
        allenamentoEsercizioRequest.index = this._trainingExerciseRequests.length;
        this._trainingExerciseRequests.push(allenamentoEsercizioRequest);
    }

    //sposta in alto di uno l'esercizio, scambiandolo con quello precedente e aggiornando gli indici
    public goUp(index: number) {
        console.log(index + "go up");
        if (index > 0 && index < this._trainingExerciseRequests.length) {
            let temp = this._trainingExerciseRequests[index];
            this._trainingExerciseRequests[index] = this._trainingExerciseRequests[index - 1];
            this._trainingExerciseRequests[index - 1] = temp;
            this.setAllIndexesByPosition();

        }
        console.log(this._trainingExerciseRequests);
    }

    //sposta in basso di uno l'esercizio, scambiandolo con quello successivo e aggiornando gli indici
    public goDown(index: number) {
        if (index >= 0 && index <= this._trainingExerciseRequests.length - 2) {
            console.log(index + "go down");
            let temp = this._trainingExerciseRequests[index];
            console.log(temp);
            this._trainingExerciseRequests[index] = this._trainingExerciseRequests[index + 1];
            this._trainingExerciseRequests[index + 1] = temp;
            this.setAllIndexesByPosition();
        }
        console.log(this._trainingExerciseRequests);
    }

    public removeExerciseToTrain(index: number) {
        if (index >= 0 && index < this._trainingExerciseRequests.length) {
            this._trainingExerciseRequests.splice(index, 1);
        }
        this.updateExerciseIndexAfterRemovingIndex(index);
    }
    public updateExerciseOfTrain(allenamentoEsercizioRequest: AllenamentoEsercizioRequest) {
        this._trainingExerciseRequests[allenamentoEsercizioRequest.index] = allenamentoEsercizioRequest;
    }

    /*combination delle richieste tramite forkJoin: Una volta create tutte le richieste per gli esercizi, vengono raccolte in un array di Observable. Questi Observable rappresentano ciascuna delle richieste di salvataggio degli esercizi. Utilizzando l'operatore forkJoin, tutte queste richieste vengono combinate in un unico Observable. Questo Observable emetterà un valore solo quando tutte le richieste di salvataggio degli esercizi saranno state completate. */
    public saveTraining$(): Observable<any> {
        let obs3$ = forkJoin(this._trainingExerciseRequests.map((exercise) => this.training_exercise_service.saveAllenamentoEsercizio({ body: exercise })));
        let obs2$ = this.trainingService.saveAllenamento({ body: this._train }).pipe(map((response) => { this.updateTrainingExerciseRequestId(response.id) }));
        let obs1$ = this.deleteTrainingExercises$(this.getIDsOfRemovedExercises());
        return concat(obs1$, obs2$, obs3$);
    }


    //UTILITIES FUNCTIONS
    //La funzione mi serve nel caso stia facendo un update di un allenamento, gli esercizi ottenuti devo trasformarli in esercizi request
    /*
mentre i due mergeMap sono concettualmente sequenziali, ciò non implica che l'intero processo sia sincrono. Le operazioni all'interno di ciascun mergeMap possono essere asincrone, ma verranno eseguite nell'ordine in cui sono definite nel flusso di osservabili.
*/
    private getTrainingExercises$(allenamento_id: number): Observable<any> {
        return this.training_exercise_service.findAllAuthAllenamentoEsercizioByAllenamentoIdNoPagination({ 'allenamento-id': allenamento_id })
            .pipe(
                mergeMap((esercizi) => {
                    this._trainingExercisesResponse = esercizi;
                    this.mapTrainingExerciseResponseToRequest();
                    // Ordino gli esercizi in base all'indice, in modo da avere un array ordinato
                    this.orderArrayByExercisesIndex();
                    // Salvo la lista di partenza degli esercizi,
                    // in modo da poterla utilizzare per eliminare gli esercizi che non sono più presenti

                    //copia profonda dell'array
                    this._starting_trainingExerciseRequests = this._trainingExerciseRequests.map((exercise) => ({ ...exercise }));

                    return this.retrieveExercises$();
                }),
                mergeMap((exercises) => {
                    this._exercisesResponse = exercises;
                    return EMPTY;
                })
            );
    }
    /**
     * Observable che mi permette di recuperare gli esercizi in base agli id degli esercizi dentro _trainingExerciseRequests
     * @returns 
     */
    private retrieveExercises$(): Observable<any[]> {
        const exerciseRequests = [];
        for (const exercise of this._trainingExerciseRequests) {
            exerciseRequests.push(this.exerciseService.findAuthenticatedUserOrDefaultExerciseById({ 'exercise-id': exercise.id_esercizio }));
        }
        return forkJoin(exerciseRequests); // Utilizzo forkJoin per eseguire tutte queste richieste in parallelo. forkJoin restituisce un osservabile che emetterà un array con i risultati di tutte le richieste quando saranno complete.
    }


    private mapTrainingExerciseResponseToRequest() {
        if (this._trainingExercisesResponse) {
            for (const trainingExercise of this._trainingExercisesResponse) {
                this._trainingExerciseRequests.push({
                    id: trainingExercise.id,
                    id_esercizio: trainingExercise.esercizio_id,
                    id_allenamento: trainingExercise.allenamento_id,
                    index: trainingExercise.index,
                    serie: trainingExercise.serie,
                    ripetizioni: trainingExercise.ripetizioni,
                    recupero: trainingExercise.recupero,
                });
            }
        }
    }
    private addExerciseToExercices(id: number) {
        if (this._exercisesResponse.find(exercise => exercise.id === id)) {
            return;
        }
        //recupero l'esercizio
        this.exerciseService.findAuthenticatedUserOrDefaultExerciseById({
            'exercise-id': id as number
        }).subscribe({
            next: (exercise) => {
                this._exercisesResponse.push(exercise);
            }
        });
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
    //funzione che mi permette di aggiornare gli indici degli esercizi sulla base della posizione nell'array
    private setAllIndexesByPosition() {
        for (let i = 0; i < this._trainingExerciseRequests.length; i++) {
            this._trainingExerciseRequests[i].index = i;
        }
    }
    private orderArrayByExercisesIndex() {
        this._trainingExerciseRequests.sort((a, b) => a.index - b.index);
    }
    private updateTrainingExerciseRequestId(id: number) {
        this._train.id = id;
        for (let i = 0; i < this._trainingExerciseRequests.length; i++) {
            this._trainingExerciseRequests[i].id_allenamento = id;
        }
    }

    private getIDsOfRemovedExercises(): number[] {
        return this._starting_trainingExerciseRequests.filter(
            (exercise) => (!this._trainingExerciseRequests.find((request) => (request.id === exercise.id) ) ||
            !this._trainingExerciseRequests.find((request) => (request.id === exercise.id && request.index === exercise.index) ))
        ).map((exercise) => exercise.id as number);
    }

    private deleteTrainingExercises$(removedExercisesIDs: number[]): Observable<any> {
        if (removedExercisesIDs.length === 0) {
            return EMPTY;
        }
        const deleteRequests = removedExercisesIDs.map((id) => this.training_exercise_service.deleteAllenamentoEsercizio({ 'allenamentoEsercizio-id': id }));
        return forkJoin(deleteRequests);
    }

    /*BOILERPLATE CODE*/
    public getTrainingExerciseRequestById(id: number): AllenamentoEsercizioRequest[] | undefined {
        return this._trainingExerciseRequests.filter(exercise => exercise.id_esercizio === id);
    }
    public getExerciseResponseById(id: number): ExerciseResponse | null {
        return this._exercisesResponse.find(exercise => exercise.id === id) || null;
    }
    get train(): AllenamentoRequest { return this._train; }
    get trainingExercisesRequest(): AllenamentoEsercizioRequest[] { return this._trainingExerciseRequests; }
    get trainingExercisesResponse(): AllenamentoEsercizioResponse[] { return this._trainingExercisesResponse; }
    get exercisesResponse(): Array<ExerciseResponse> { return this._exercisesResponse; }
    public setTrainName(name: string) {
        this._train.name = name;
    }

    public setTrainDescription(description: string) {
        this._train.description = description;
    }
    public setTrainDuration(duration: number) {
        this._train.durata_in_ore = duration;
    }
}
