import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {authGuard} from './services/guard/auth.guard';
import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


const HOME_PATH = '';
const PERSONAL_AREA_PATH = 'area-personale';
const LOGIN_PATH = 'login';
const REGISTER_PATH = 'register';
const ACTIVATE_ACCOUNT_PATH = 'activate-account';


const routes: Routes = [
  {
    path: HOME_PATH,
    component: HomePageComponent
  },
  {
    path: LOGIN_PATH,
    component: LoginComponent
  },
  {
    path: REGISTER_PATH,
    component: RegisterComponent
  },
  {
    path: ACTIVATE_ACCOUNT_PATH,
    component: ActivateAccountComponent
  },
  {
    path: PERSONAL_AREA_PATH,
    loadChildren: () => import('./modules/sub_app/sub_app.module').then(m => m.sub_appModule),
    canActivate: [authGuard]
  },
  //Wild Card Route for 404 request 
  { path: '**', pathMatch: 'full',  
  component: PagenotfoundComponent }, 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  static get homePath(): string {
    return HOME_PATH;
  }
  
  static get personalAreaPath(): string {
    return PERSONAL_AREA_PATH;
  }

  static get loginPath(): string {
    return LOGIN_PATH;
  }

  static get registerPath(): string {
    return REGISTER_PATH;
  }

  static get activateAccountPath(): string {
    return ACTIVATE_ACCOUNT_PATH;
  }

 }
