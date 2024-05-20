import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { TokenService } from '../../services/token/token.service';
import { AppRoutingModule } from '../../app-routing.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

import { ErrorHandlerService } from '../../services/myServices/error-handler/error-handler.service';
import { FeedbackInfoPointComponent } from '../../component/feedback-info-point/feedback-info-point.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule, FeedbackInfoPointComponent]
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { username: '', password: '' };
  messages: Array<string> = [];
  loginForm = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private handleError: ErrorHandlerService
  ) {
  }

  login() {
    if (this.loginForm.valid) {
      localStorage.clear();
      this.messages = [];
      this.bindFormWith_AuthRequest();
      this.authService.authenticate({
        body: this.authRequest
      }).subscribe({
        next: (res) => {
          this.tokenService.token = res.token as string;
          this.router.navigate([AppRoutingModule.personalAreaPath]);
        },
        error: (error) => {
          this.handleError.handleError(error).forEach((value) => {
            this.messages.push(value.message);
            console.log(value.message);
          });
        }
      });
    } else {
      this.messages = ["Compilare tutti i campi correttamente"];
    }
  }

  register() {
    this.router.navigate(['register']);
  }

  //BOILERPLATE CODE
  private bindFormWith_AuthRequest() {
    this.authRequest.username = this.loginForm.controls.username.value as string;
    this.authRequest.password = this.loginForm.controls.password.value as string;
  }
}
