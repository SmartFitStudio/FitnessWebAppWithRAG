import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {RegistrationRequest} from '../../services/models/registration-request';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ErrorHandlerService } from '../../services/myServices/error-handler/error-handler.service';
import { FeedbackInfoPointComponent } from '../../component/feedback-info-point/feedback-info-point.component';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, FormsModule,FeedbackInfoPointComponent]
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '',  firstname: '', lastname: '', password: '', username: ''};
  messages: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private handleError: ErrorHandlerService

  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    localStorage.clear(); // NOTE: controlla che sia corretto farlo
    this.messages = [];
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate([AppRoutingModule.activateAccountPath]);
        },
        error: (err) => {
          this.messages = this.handleError.handleError(err);
        }
      });
  }
}
