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
  isLinear = false;
  nome_periodo_attivo: string = "";
  private _isPopUpOpen: boolean = false;
  private is_updating = false;
  private lastPutRequestInfo: { day: number, periodo: PeriodoGiornata } | null = null;
  private subs: Subscription[] = [];
  obbiettivi: Array<String> = getObbiettivoPeriodoValues();
  errorMsg: Array<String> = [];
  periodForm = this.formBuilder.group({
    nome_periodo: ['', Validators.required],
    obiettivo: [ObbiettivoPeriodo.NON_DEFINITO, Validators.required],
    durata_in_giorni: [7, [Validators.required, Validators.min(1)]],
    data_inizio: ['', Validators.required], 
    data_fine: [''],
    is_attivo: [false, Validators.required]
  });


  constructor(private formBuilder: FormBuilder,
    private _periodManager: PeriodManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
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
          if (this._periodManager.periodoName !== "") {
            this.is_updating = true;
          }
        },
        error: (error) => {
          this.errorMsg = this.errorHandler.handleError(error);
        }
      }));
    }
   
    this.retrieveActivePeriod();
    
    this.controlActivationPeriodo();
  }

  private retrieveActivePeriod() {
      //Senza aspettare l'operazione sopra, recupero anche il periodo attivo
      this.subs.push(this._periodManager.getActivePeriod$().subscribe(
        {
          error: (error) => {
            this.errorMsg = this.errorHandler.handleError(error);
          }
        }
      ));
  }

  private controlActivationPeriodo(){
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

  //DO la possibilità di disattivare il periodo attivo
  disable_active_period() {
    this._periodManager.disableActivePeriodo$().subscribe({
      complete: () => {
        this.nome_periodo_attivo = "";
      },
      error: (error) => {
        this.errorMsg = this.errorHandler.handleError(error);
      }
    });
  }

  get isPopUpOpen(): boolean {
    return this._isPopUpOpen;
  }
  get isUpdating(): boolean {
    return this.is_updating;
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

  public getAllenamentoById(id: number): AllenamentoResponse | undefined {
    return this._periodManager.getAllenamentoById(id);
  }


  private updatePeriodInfo() {
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
  closeDialog() {
    this._isPopUpOpen = false;
  }

  getAllenamentoPeriodoByDay(day: number): PeriodoAllenamentoRequest[] {
    return this._periodManager.getAllenamentiPeriodoByDay(day);
  }

  private emptyErrorMsg() {
    this.errorMsg = [];
  }

  addNewTraining($event: { day: number, periodo: PeriodoGiornata }) {
    this.emptyErrorMsg();
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
    this.emptyErrorMsg();
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
    this.updatePeriodInfo();
    this.subs.push(this._periodManager.savePeriodo$().subscribe({
      complete: () => {
        this.router.navigate([sub_appRoutingModule.full_myPeriodsPath]);
      },
      error: (err) => {
        this.errorMsg = this.errorHandler.handleError(err);
        this.errorMsg.push("Errore nel salvataggio del periodo");
      }
    })); 
  }



}
