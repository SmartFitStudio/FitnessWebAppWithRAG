import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { RegistrationRequest } from '../../services/models/registration-request';
import { AppRoutingModule } from '../../app-routing.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ErrorHandlerService } from '../../services/myServices/error-handler/error-handler.service';
import { FeedbackInfoPointComponent } from '../../component/feedback-info-point/feedback-info-point.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule, FeedbackInfoPointComponent]
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = { email: '', firstname: '', lastname: '', password: '', username: '', dateOfBirth: '' };
  messages: Array<string> = [];
  registerForm = new FormGroup({
    firstname: new FormControl<string | null>(null, Validators.required),
    lastname: new FormControl<string | null>(null, Validators.required),
    dateOfBirth: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, Validators.required),
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

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
    if (this.registerForm.valid) {
      localStorage.clear(); // NOTE: controlla che sia corretto farlo
      this.messages = [];
      this.bindFormWith_RegisterRequest();
      this.authService.register({
        body: this.registerRequest
      })
        .subscribe({
          next: () => {
            this.router.navigate([AppRoutingModule.activateAccountPath]);
          },
          error: (error) => {
            this.handleError.handleError(error).forEach((value) => {
              this.messages.push(value.message);
            });
          }
        });
    } else {
      this.messages = ["Compilare tutti i campi correttamente"];
    }

  }


  //BOILERPLATE CODE
  private bindFormWith_RegisterRequest() {
    if (this.registerForm.valid) {
      this.registerRequest.firstname = this.registerForm.controls.firstname.value as string;
      this.registerRequest.lastname = this.registerForm.controls.lastname.value as string;
      this.registerRequest.dateOfBirth = this.registerForm.controls.dateOfBirth.value as string;
      this.registerRequest.email = this.registerForm.controls.email.value as string;
      this.registerRequest.username = this.registerForm.controls.username.value as string;
      this.registerRequest.password = this.registerForm.controls.password.value as string;
    }
  }
}
