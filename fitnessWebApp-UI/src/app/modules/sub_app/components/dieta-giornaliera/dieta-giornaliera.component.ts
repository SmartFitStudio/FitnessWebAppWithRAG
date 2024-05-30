import { Component, Input } from '@angular/core';
import { DietaGiornalieraRag } from '../../../../services/models';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-dieta-giornaliera',
  standalone: true,
  imports: [NgFor,NgIf,AccordionModule, TooltipModule, InputTextModule ,InputNumberModule],
  templateUrl: './dieta-giornaliera.component.html',
  styleUrl: './dieta-giornaliera.component.scss'
})
export class DietaGiornalieraComponent {
private _dietaGiornaliera!: DietaGiornalieraRag;

@Input({required: true})
set dietaGiornaliera(dietaGiornaliera: DietaGiornalieraRag) {
    this._dietaGiornaliera = dietaGiornaliera;
}

//BOILERPLATE CODE
get dietaGiornaliera(): DietaGiornalieraRag {
    return this._dietaGiornaliera; 
}
}
