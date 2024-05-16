import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {TokenService} from '../../services/token/token.service';
import { AppRoutingModule } from '../../app-routing.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule]
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {username: '', password: ''};
  errorMsg: Array<string> = [];

  loginForm = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {
  }

  private bindFormWith_AuthRequest() {
    this.authRequest.username = this.loginForm.controls.username.value as string;
    this.authRequest.password = this.loginForm.controls.password.value as string;
  }

  login() {
    localStorage.clear();
    this.errorMsg = [];
    this.bindFormWith_AuthRequest();
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate([AppRoutingModule.personalAreaPath]);
        console.log(res.token);
      },
      error: (err) => {
        console.log(err.error.businessErrorDescription);
          this.errorMsg.push(err.error.businessErrorDescription);
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
