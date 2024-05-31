import { Component, Inject, OnInit } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItemGroup } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';
import { ObbiettivoPeriodo } from '../../../../services/myModels/obbiettivoPeriodo';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { DietCategory, getAllDietCategories } from '../../../../services/myModels/dietCategory';
import { RagllmService } from '../../../../services/services';
import { DietBase, PianoAlimentareRag } from '../../../../services/models';
import { PianoAlimentareViewComponent } from '../../components/piano-alimentare-view/piano-alimentare-view.component';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { delay } from 'rxjs';
@Component({
  selector: 'app-manage-diet',
  standalone: true,
  templateUrl: './manage-diet.component.html',
  styleUrl: './manage-diet.component.scss',
  imports: [StepperModule, PianoAlimentareViewComponent, FeedbackInfoPointComponent, ButtonModule, FieldsetModule, FormsModule, ReactiveFormsModule, InputTextModule, MultiSelectModule, FloatLabelModule, InputTextareaModule, DropdownModule],

})
export class ManageDietComponent extends MessageHandler {
  menu_tipos: DietCategory[] = getAllDietCategories();
  diet_generated: boolean = false;
  // EVITA DI ATTENDERE LA RISPOSTA DEL SERVER
  //  diet_generated: boolean = true;

  dietBaseForm = this.formBuilder.group({
    titolo: ['', Validators.required],
    descrizione: ['', Validators.required],
    categorie: [Array<DietCategory>(), []],
  });

  private baseDiet: DietBase = {
    titolo: '',
    descrizione: ''
  }
  private generatedDiet?: PianoAlimentareRag;
 /* private generatedDiet: PianoAlimentareRag = {
    "lun": {
      "colazione": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "pranzo": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "cena": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      }
    },
    "mar": {
      "colazione": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "pranzo": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "cena": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      }
    },
    "mer": {
      "colazione": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "pranzo": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "cena": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      }
    },
    "gio": {
      "colazione": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "pranzo": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "cena": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      }
    },
    "ven": {
      "colazione": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "pranzo": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "cena": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      }
    },
    "sab": {
      "colazione": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "pranzo": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "cena": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      }
    },
    "dom": {
      "colazione": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "pranzo": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      },
      "cena": {
        "alimenti": [
          {
            "nome": "string",
            "quantita": 0,
            "calorie": 0
          }
        ]
      }
    },
    "motivazioni": "string"
  };
*/
  private _printView = false;

  constructor(private formBuilder: FormBuilder,
    private ragService: RagllmService,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
  }


  generateDiet() {
    if (this.bindDietBaseFormToBaseDiet()) {
      this.addMessage('info', 'Generazione in corso...');
      this.ragService.generateDiet({ body: this.baseDiet }).subscribe({
        next: (diet) => {
          this.generatedDiet = diet;
          this.clearMessages();
          this.diet_generated = true;
          console.log(diet);
          this.addMessage('success', 'Dieta generata con successo');
        },
        error: (error) => {
          this.handleErrorMessages(error);
        }
      });
    } else {
      this.addMessage('error', 'Compila tutti i campi');
    }
  }

  printPage() {
    this._printView = true;
    setTimeout(() => {
      window.print();
    }, 500);
  }


  //BOILERPLATE CODE

  private bindDietBaseFormToBaseDiet(): boolean {
    if (this.dietBaseForm.valid) {
      if (this.dietBaseForm.value.titolo) {
        this.baseDiet.titolo = this.dietBaseForm.value.titolo;
      }
      if (this.dietBaseForm.value.descrizione) {
        this.baseDiet.descrizione = this.dietBaseForm.value.descrizione;
      }
      if (this.dietBaseForm.value.categorie) {
        this.baseDiet.categorie = this.dietBaseForm.value.categorie;
      }
      return true;
    }
    return false;

  }

  get generated_diet(): PianoAlimentareRag | undefined {
    return this.generatedDiet;
  }

  get printView(): boolean {
    return this._printView;
  }
}
