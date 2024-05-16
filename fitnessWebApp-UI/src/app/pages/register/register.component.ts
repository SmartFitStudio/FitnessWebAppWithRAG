import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {RegistrationRequest} from '../../services/models/registration-request';
import { AppRoutingModule } from '../../app-routing.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule]
})
export class RegisterComponent {

  registerRequest: RegistrationRequest = {email: '',  firstname: '', lastname: '', password: '', username: '', dateOfBirth: ''};
  errorMsg: Array<string> = [];

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
    private authService: AuthenticationService
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  private bindFormWith_RegisterRequest() {
    this.registerRequest.firstname = this.registerForm.controls.firstname.value as string;
    this.registerRequest.lastname = this.registerForm.controls.lastname.value as string;
    this.registerRequest.dateOfBirth = this.registerForm.controls.dateOfBirth.value as string;
    this.registerRequest.email = this.registerForm.controls.email.value as string;
    this.registerRequest.username = this.registerForm.controls.username.value as string;
    this.registerRequest.password = this.registerForm.controls.password.value as string;
  }

  register() {
    localStorage.clear(); // NOTE: controlla che sia corretto farlo
    this.errorMsg = [];
    this.bindFormWith_RegisterRequest();
    this.authService.register({
      body: this.registerRequest
    })
      .subscribe({
        next: () => {
          this.router.navigate([AppRoutingModule.activateAccountPath]);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      });
  }
}
