import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressService } from '../../../../services/services';
import { ProgressoRequest } from '../../../../services/models/progresso-request';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';

import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { ProgressoResponse } from '../../../../services/models';

@Component({
  selector: 'app-manage-progress',
  standalone: true,
  imports: [NgFor, NgIf, FeedbackInfoPointComponent,RouterLink, ReactiveFormsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-progress.component.html',
  styleUrl: './manage-progress.component.scss'
})
export class ManageProgressComponent extends MessageHandler implements OnInit {
  progressoForm = this.formBuilder.group({
    peso: [0, [Validators.required, Validators.min(0)]],
    massa_grassa: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    massa_muscolare: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    altezza_cm: [0, [Validators.required, Validators.min(0)]],
    note: ['', [Validators.maxLength(500)]],
    data_misurazione: [new Date().toLocaleDateString('en-GB'), [Validators.required]],
  });

  private progressoRequest!: ProgressoRequest;
  private progressoId?: number;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private progressoService: ProgressService,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
  }

  ngOnInit(): void {
    this.progressoId = this.activatedRoute.snapshot.params['progresso_id'];
    if (this.isProgressoIdSet() && this.progressoId != null) {
      this.getProgressoById(this.progressoId)
    }
    else {
      this.getLastProgresso();
    }

  }

  private getProgressoById(id: number) {
    this.progressoService.getProgresso({
      'progresso-id': id
    }).subscribe({
      next: (response) => {
        this.patchValue(response);
      },
      error: (error) => {
        this.handleErrorMessages(error);
      }
    });
  }

  private getLastProgresso() {
    this.progressoService.getLastNProgressi({
      N: 1
    }).subscribe({
      next: (response) => {
        response[0].dataMisurazione = this.formatDate(new Date());
        this.patchValue(response[0]);
      },
      error: (error) => {
        this.handleErrorMessages(error);
      }
    });
  }

  submitForm() {
    this.bindFormToRequest();
    if (this.isProgressoIdSet()) {
      this.updateProgresso();
    } else {
      this.saveNewProgresso();
    }
  }

  private saveNewProgresso() {
    this.progressoService.addProgresso({ body: this.progressoRequest }).subscribe({
      next: (response) => {
        this.router.navigate([sub_appRoutingModule.full_homePath]);
      },
      error: (error) => {
        this.handleErrorMessages(error);
      }
    });
  }

  private updateProgresso() {
    if (this.isProgressoIdSet() && this.progressoId != null) {
      this.progressoService.updateProgresso({ 'progresso-id': this.progressoId, body: this.progressoRequest }).subscribe({
        next: (response) => {
          this.router.navigate([sub_appRoutingModule.full_homePath]);
        },
        error: (error) => {
          this.handleErrorMessages(error);
        }
      });
    }
  }

  //BOILERPLATE CODE
  private formatDate(date: Date): string {
      return date.getFullYear() + '-' + 
             (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '-' +
             (date.getDate() < 10 ? '0' : '') + date.getDate();
  }

  private patchValue(progressoResponse: ProgressoResponse) {
    this.progressoForm.patchValue({
      peso: progressoResponse.pesoKg,
      massa_grassa: progressoResponse.percentualeMassaGrassa,
      massa_muscolare: progressoResponse.percentualeMassaMuscolare,
      altezza_cm: progressoResponse.altezzaCm,
      note: progressoResponse.note,
      data_misurazione: progressoResponse.dataMisurazione
    });
  }
  private isProgressoIdSet(): boolean {
    return this.progressoId != undefined && this.progressoId != null;
  }
  private bindFormToRequest() {
    if (this.IsFormValid) {
      this.progressoRequest = {
        pesoKg: this.progressoForm.value.peso as number,
        percentualeMassaGrassa: this.progressoForm.value.massa_grassa as number,
        percentualeMassaMuscolare: this.progressoForm.value.massa_muscolare as number,
        altezzaCm: this.progressoForm.value.altezza_cm as number,
        note: this.progressoForm.value.note as string,
        dataMisurazione: (this.progressoForm.value.data_misurazione ? this.progressoForm.value.data_misurazione : new Date()) as unknown as string
      }
    }
  }
  get IsPesoInputValid(): boolean {
    return this.progressoForm.controls['peso'].valid;
  }
  get IsMassaGrassaInputValid(): boolean {
    return this.progressoForm.controls['massa_grassa'].valid;
  }
  get IsMassaMuscolareInputValid(): boolean {
    return this.progressoForm.controls['massa_muscolare'].valid;
  }
  get IsAltezzaInputValid(): boolean {
    return this.progressoForm.controls['altezza_cm'].valid;
  }
  get IsDataMisurazioneInputValid(): boolean {
    return this.progressoForm.controls['data_misurazione'].valid;
  }
  get IsNoteInputValid(): boolean {
    return this.progressoForm.controls['note'].valid;
  }
  get IsFormValid(): boolean {
    return this.progressoForm.valid;
  }

  get homePath(): string {
    return sub_appRoutingModule.full_homePath;
  }
}
