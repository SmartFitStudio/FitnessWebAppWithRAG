import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressService } from '../../../../services/services';
import { ProgressoRequest } from '../../../../services/models/progresso-request';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';

import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { sub_appRoutingModule } from '../../sub_app-routing.module';

@Component({
  selector: 'app-manage-progress',
  standalone: true,
  imports: [NgFor, NgIf, FeedbackInfoPointComponent, ReactiveFormsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-progress.component.html',
  styleUrl: './manage-progress.component.scss'
})
export class ManageProgressComponent extends MessageHandler implements OnInit {
  progressoForm = this.formBuilder.group({
    peso: [0, [Validators.required, Validators.min(0)]],
    massa_grassa: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    massa_magra: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
    altezza_cm: [0, [Validators.required, Validators.min(0)]],
    note : ['', [Validators.maxLength(500)]],
    data_misurazione: [new Date().toLocaleDateString('en-GB'), [Validators.required]],
  });

  private progressoRequest!: ProgressoRequest;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private progressoService: ProgressService,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
  }

  ngOnInit(): void {
    this.progressoService.getLastNProgressi({
      N: 1
    }).subscribe({
      next: (response) => {
        this.progressoForm.patchValue({
          peso: response[0].pesoKg,
          massa_grassa: response[0].percentualeMassaGrassa,
          massa_magra: response[0].percentualeMassaGrassa,
          altezza_cm: response[0].altezzaCm
        });
      },
      error: (error) => {
        this.handleErrorMessages(error);
      }
    });
  }

  submitForm() {
    this.bindFormToRequest();
    this.progressoService.addProgresso({ body: this.progressoRequest }).subscribe({
      next: (response) => {
        this.router.navigate([sub_appRoutingModule.full_homePath]);
      },
      error: (error) => {
        this.handleErrorMessages(error);
      }
    });
  }

  //BOILERPLATE CODE
  private bindFormToRequest() {
    if (this.IsFormValid) {
      this.progressoRequest = {
        pesoKg: this.progressoForm.value.peso as number,
        percentualeMassaGrassa: this.progressoForm.value.massa_grassa as number,
        percentualeMassaMagra: this.progressoForm.value.massa_magra as number,
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
  get IsMassaMagraInputValid(): boolean {
    return this.progressoForm.controls['massa_magra'].valid;
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
}
