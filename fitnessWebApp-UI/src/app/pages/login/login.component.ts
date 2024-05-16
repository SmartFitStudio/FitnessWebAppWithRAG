import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/services/authentication.service';
import {AuthenticationRequest} from '../../services/models/authentication-request';
import {TokenService} from '../../services/token/token.service';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

import { ErrorHandlerService } from '../../services/myServices/error-handler/error-handler.service';
import { ErrorListComponent } from '../../component/error-list/error-list.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, FormsModule,ErrorListComponent]
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {username: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private handleError: ErrorHandlerService
  ) {
  }

  login() {
    localStorage.clear();
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate([AppRoutingModule.personalAreaPath]);
        console.log(res.token);
      },
      error: (err) => {
        this.errorMsg = this.handleError.handleError(err);
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
