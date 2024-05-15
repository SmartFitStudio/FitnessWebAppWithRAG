import { Pipe, PipeTransform } from '@angular/core';
import { ObbiettivoPeriodo } from '../../../../services/myModels/obbiettivoPeriodo';

@Pipe({
    name: 'obiettivoPeriodoPipe',
    standalone: true
})
export class ObiettivoPeriodoPipePipe implements PipeTransform {

  transform(obiettivo: ObbiettivoPeriodo| undefined): string  {
    if(obiettivo === ObbiettivoPeriodo.NON_DEFINITO || !obiettivo){
      return "";
    }
    return " · " + obiettivo;
  }

}
