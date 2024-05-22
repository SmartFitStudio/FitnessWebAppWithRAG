import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {


  get loginLink(): string {
    return AppRoutingModule.loginPath;
  }

  get registerLink(): string {
    return AppRoutingModule.registerPath;
  }

}
