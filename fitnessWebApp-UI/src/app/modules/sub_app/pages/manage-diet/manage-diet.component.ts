import { Component, OnInit } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItemGroup } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
@Component({
  selector: 'app-manage-diet',
  standalone: true,
  templateUrl: './manage-diet.component.html',
  styleUrl: './manage-diet.component.scss',
  imports: [StepperModule, ButtonModule, FieldsetModule,FormsModule, InputTextModule,MultiSelectModule, FloatLabelModule, InputTextareaModule, DropdownModule],

})
export class ManageDietComponent implements OnInit {
  menu_tipos: any[] | undefined;

  ngOnInit() {
      this.menu_tipos = [
          { name: 'Onnivoro'},
          { name: 'Vegetariano'},
          { name: 'Vegano'},
          { name: 'Celiaco'},
          { name: 'Pescetariano'},
          { name: 'Fruttariano'},
          { name: 'Keto'},
          { name: 'Low Carb'},
      ];
  }
}
