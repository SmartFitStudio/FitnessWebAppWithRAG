import { Component } from '@angular/core';
import { sub_appRoutingModule } from '../../sub_app-routing.module';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    standalone: true,
    imports: [RouterLinkActive, RouterLink]
})
export class MenuComponent {


  get myTrainsLink(): string {
    return sub_appRoutingModule.full_myTrainsPath;
  }

  get myExercisesLink(): string {
    return sub_appRoutingModule.full_myExercisesPath;
  }

  get myPeriodsLink(): string {
    return sub_appRoutingModule.full_myPeriodsPath;
  }

  get homeLink(): string {
    return sub_appRoutingModule.full_homePath;
  }
}

