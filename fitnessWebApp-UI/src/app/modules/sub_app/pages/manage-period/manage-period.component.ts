import { Component, OnDestroy, OnInit } from '@angular/core';
import { ObbiettivoPeriodo, getObbiettivoPeriodoValues } from '../../../../services/myModels/obbiettivoPeriodo';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, ValidationErrors } from '@angular/forms';
import { PeriodManagerService } from '../../services/period-manager-service/period-manager.service';
import { AllenamentoResponse, PeriodoAllenamentoRequest, PeriodoRequest } from '../../../../services/models';
import { PeriodoGiornata } from '../../../../services/myModels/periodoGiornata';
import { ActivatedRoute, Router } from '@angular/router';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TrainingPeriodCardComponent } from '../../components/training-period-card/training-period-card.component';
import { PeriodDayCardComponent } from '../../components/period-day-card/period-day-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MyTrainingListNoPaginationComponent } from '../../components/my-training-list-no-pagination/my-training-list-no-pagination.component';
import { NgIf, NgFor, NgClass } from '@angular/common';

import {
  MatDialogModule,
} from '@angular/material/dialog';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';

@Component({
  selector: 'app-manage-period',
  templateUrl: './manage-period.component.html',
  styleUrls: ['./manage-period.component.scss'],
  providers: [PeriodManagerService] // Fornisce il servizio a livello di componente
  ,
  standalone: true,
  imports: [MatDialogModule, NgIf, NgFor, MyTrainingListNoPaginationComponent, MatStepperModule, NgClass, FormsModule, ReactiveFormsModule, MatButtonModule, PeriodDayCardComponent, TrainingPeriodCardComponent, FeedbackInfoPointComponent]
})

export class ManagePeriodComponent implements OnInit, OnDestroy {
  nome_periodo_attivo: string = ""; //per mostrare il nome del periodo attivo
  errorMsg: Array<String> = [];
  level: 'success' | 'error' = 'success';
  periodForm = this.formBuilder.group({
    nome_periodo: ['', Validators.required],
    obiettivo: [ObbiettivoPeriodo.NON_DEFINITO, Validators.required],
    durata_in_giorni: [7, [Validators.required, Validators.min(1)]],
    data_inizio: ['', Validators.required],
    data_fine: [''],
    is_attivo: [false, Validators.required]
  });

  private _isPopUpOpen: boolean = false;
  private lastPutRequestInfo: { day: number, periodo: PeriodoGiornata } | null = null; //informazione sull'ultima richiesta di aggiunta di un allenamento
  private subs: Subscription[] = [];
  //FOR THE SELECT INPUT VALUES
  private _obbiettivi: Array<String> = getObbiettivoPeriodoValues();

  constructor(private formBuilder: FormBuilder,
    private _periodManager: PeriodManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private handleError: ErrorHandlerService,
    public dialog: MatDialog,
  ) { }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    const periodo_id = this.activatedRoute.snapshot.params['period_id'];
    if (periodo_id) {
      this.subs.push(this._periodManager.setInfoByPeriodName$(periodo_id).subscribe({
        complete: () => {
          this.periodForm.patchValue({
            nome_periodo: this._periodManager.periodoName,
            obiettivo: this._periodManager.periodoObiettivo,
            durata_in_giorni: this._periodManager.periodoDurataInGiorni,
            data_inizio: this._periodManager.periodoDataInizio,
            data_fine: this._periodManager.periodoDataFine,
            is_attivo: this._periodManager.periodoAttivo
          });
          this.level = 'success';
          this.errorMsg = ['Informazioni caricate correttamente'];
        },
        error: (error) => {
          this.level = 'error';
          this.handleError.handleError(error).forEach((value) => {
            this.errorMsg.push(value.message);
          });
        }
      }));
    }
    //Recupero il periodo attivo
    this.retrieveActivePeriod();
    //imposto il controllo sulla attivazione del periodo
    this.controlActivationPeriodo();
  }

  private retrieveActivePeriod() {
    //Senza aspettare l'operazione sopra, recupero anche il periodo attivo
    this.subs.push(this._periodManager.getActivePeriod$().subscribe(
      {
        error: (error) => {
          this.level = 'error';
          this.handleError.handleError(error).forEach((value) => {
            this.errorMsg.push(value.message);
          });
        }
      }
    ));
  }

  private controlActivationPeriodo() {
    if (this.periodForm.get('is_attivo')) {
      //mi iscrivo ai cambiamenti del checkbox sul periodo
      let obs$ = this.periodForm.get('is_attivo')?.valueChanges.subscribe(isActive => {
        if (isActive) {
          this._periodManager.periodoAttivo = true;
          if (this._periodManager.activePeriod) { // se c'è un periodo attivo, e non è quello che sto modificando.
            this.nome_periodo_attivo = (this._periodManager.activePeriod as PeriodoRequest).name;
            this.periodForm.patchValue({
              is_attivo: false
            });
          }
        }
      });
      if (obs$)
        this.subs.push(obs$);
    }
  }

  //Do la possibilità di disattivare il periodo attivo
  disable_active_period() {
    this._periodManager.disableActivePeriodo$().subscribe({
      complete: () => {
        this.nome_periodo_attivo = "";
      },
      error: (error) => {
        this.level = 'error';
        this.handleError.handleError(error).forEach((value) => {
          this.errorMsg.push(value.message);
        });
      }
    });
  }

  addNewTraining($event: { day: number, periodo: PeriodoGiornata }) {
    this.errorMsg = [];
    if (this.periodForm.value.nome_periodo) {
      this.lastPutRequestInfo = $event;
      this._isPopUpOpen = true;
    } else {
      this.errorMsg.push("Inserire prima un nome per il periodo");
    }
  }

  removeTraining($event: { day: number, periodo: PeriodoGiornata }) {
    this._periodManager.removeAllenamentoFromPeriodoByDayAndPeriod($event.day, $event.periodo);
  }

  add_training_top_period($event: AllenamentoResponse) {
    this.errorMsg = [];
    if (this.periodForm.value.nome_periodo) {
      this.updatePeriodInfo();
      if (this.lastPutRequestInfo && this.periodForm.value.nome_periodo && $event.name) {
        this._periodManager.addAllenamentoToPeriodo({
          giorno_del_periodo: this.lastPutRequestInfo.day,
          id_allenamento: $event.id as number,
          id_periodo: -1, //non so ancora l'id
          periodo_giornata: this.lastPutRequestInfo.periodo,
        })
      }
      this.closeDialog();
    } else {
      this.errorMsg.push("Inserire prima un nome per il periodo");
    }
  }

  submitPeriod() {
    this.errorMsg = [];
    if (!this.periodForm.valid) {
      this.errorMsg.push("Compila correttamente i campi obbligatori");
      return;
    }

    this.updatePeriodInfo();
    this.subs.push(this._periodManager.savePeriodo$().subscribe({
      complete: () => {
        this.router.navigate([sub_appRoutingModule.full_myPeriodsPath]);
      },
      error: (error) => {
        this.level = 'error';
        this.handleError.handleError(error).forEach((value) => {
          this.errorMsg.push(value.message);
        }); this.errorMsg.push("Errore nel salvataggio del periodo");
      }
    }));
  }

  /*BOILERPLATE CODE */
  private updatePeriodInfo() {
    if (this.periodForm.valid) {
      if (this.periodForm.value.nome_periodo)
        this._periodManager.periodoName = this.periodForm.value.nome_periodo;
      if (this.periodForm.value.obiettivo)
        this._periodManager.periodoObiettivo = this.periodForm.value.obiettivo;
      if (this.periodForm.value.durata_in_giorni)
        this._periodManager.periodoDurataInGiorni = this.periodForm.value.durata_in_giorni;
      if (this.periodForm.value.data_inizio)
        this._periodManager.periodoDataInizio = this.periodForm.value.data_inizio;
      if (this.periodForm.value.data_fine)
        this._periodManager.periodoDataFine = this.periodForm.value.data_fine;
      this._periodManager.periodoAttivo = this.periodForm.value.is_attivo as boolean;
    }
  }
  closeDialog() {
    this._isPopUpOpen = false;
  }

  getAllenamentoPeriodoByDay(day: number): PeriodoAllenamentoRequest[] {
    return this._periodManager.getAllenamentiPeriodoByDay(day);
  }

  get isPopUpOpen(): boolean {
    return this._isPopUpOpen;
  }
  get nome_periodo(): string {
    return this.periodForm.value.nome_periodo ? this.periodForm.value.nome_periodo : "Non definito";
  }
  get obiettivo(): string {
    return this.periodForm.value.obiettivo ? this.periodForm.value.obiettivo : "Non definito";
  }
  get period_length(): number {
    return this.periodForm.value.durata_in_giorni ? this.periodForm.value.durata_in_giorni : 0;
  }
  get allenamenti_periodo(): PeriodoAllenamentoRequest[] {
    return this._periodManager.allenamentiPeriodo;
  }
  get obbiettivi(): Array<String> {
    return this._obbiettivi;
  }
  public getAllenamentoById(id: number): AllenamentoResponse | undefined {
    return this._periodManager.getAllenamentoById(id);
  }
  get IsNomePeriodoInputValid(): boolean {
    return this.periodForm.controls.nome_periodo.valid;
  }
  get IsObiettivoInputValid(): boolean {
    return this.periodForm.controls.obiettivo.valid;
  }
  get IsDurataInputValid(): boolean {
    return this.periodForm.controls.durata_in_giorni.valid;
  }
  get IsDataInizioInputValid(): boolean {
    return this.periodForm.controls.data_inizio.valid;
  }
  get IsDataFineInputValid(): boolean {
    return this.periodForm.controls.data_fine.valid;
  }
  get IsFormValid(): boolean {
    return this.periodForm.valid;
  }
}
