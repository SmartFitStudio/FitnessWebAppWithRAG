import { NgIf, NgFor } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FeedbackInfoPointComponent } from '../../../../component/feedback-info-point/feedback-info-point.component';
import { MessageHandler } from '../../../../services/myServices/error-handler/MessageHandler';
import { ErrorHandlerService } from '../../../../services/myServices/error-handler/error-handler.service';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { UserService } from '../../../../services/services';
import { UserRequest, UserResponse } from '../../../../services/models';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-manage-profile',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule, RouterLink, FeedbackInfoPointComponent,PasswordModule , InputTextModule, FloatLabelModule, CalendarModule],
  templateUrl: './manage-profile.component.html',
  styleUrl: './manage-profile.component.scss'
})
export class ManageProfileComponent extends MessageHandler implements OnInit {

  profileForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    cognome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    data_nascita: [new Date, []],
  });
  passwordForm = this.formBuilder.group({
    password_attuale: ['', [Validators.minLength(8), Validators.maxLength(100),]],
    nuova_password: ['', []],
    conferma_password: ['', []]
  });

  user_email: string = '';

  private is_profile_form_editable: boolean = false;
  private userRequest: UserRequest = {
    firstname: '',
    lastname: '',
    dateOfBirth: new Date().toLocaleDateString('en-GB'),
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    @Inject(ErrorHandlerService) handleError: ErrorHandlerService
  ) {
    super(handleError);
    this.profileForm.disable();
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.bindUserResponseToProfileForm(user);
        this.bindUserResponseToUserRequest(user);
      },
      error: (error) => {
        this.handleErrorMessages(error);
      }
    }
    );
  }

  editProfile() {
    this.is_profile_form_editable = true;
    this.profileForm.enable();
  }

  saveProfile() {
    this.is_profile_form_editable = false;
    if (this.bindProfileFormToUserRequest()) {
      this.userService.updateUser({ body: this.userRequest }).subscribe({
        complete: () => {
          this.addMessage('success', 'Profilo aggiornato con successo');
        },
        error: (error) => {
          this.handleErrorMessages(error);
        }
      })
    }
    this.profileForm.disable();
  }


  saveNewPassword() {
    if(this.bindPasswordFormToUserRequest()){
      this.userService.updateUser({ body: this.userRequest }).subscribe({
        complete: () => {
          this.addMessage('success', 'Password aggiornata con successo');
        },
        error: (error) => {
          this.handleErrorMessages(error);
        }
      })
    }
  }

  //BOILERPLATE CODE

  private bindUserResponseToProfileForm(user: UserResponse) {
    this.profileForm.patchValue({
      nome: user.firstname,
      cognome: user.lastname,
      data_nascita: new Date(user.dateOfBirth)
    });
    this.user_email = user.email;
  }

  private bindUserResponseToUserRequest(user: UserResponse) {
    this.userRequest.firstname = user.firstname;
    this.userRequest.lastname = user.lastname;
    this.userRequest.dateOfBirth = new Date(user.dateOfBirth).toISOString();
  }

  /**
   * Se il form è valido e dirty, allora aggiorna i campi del profilo con i valori del form
   * altrimenti ritorna false, ovvero il form non è valido
   * @returns 
   */
  private bindProfileFormToUserRequest(): boolean {
    if (this.profileForm.valid && this.profileForm.dirty) {
      if (this.profileForm.value.nome) {
        this.userRequest.firstname = this.profileForm.value.nome;
      }
      if (this.profileForm.value.cognome) {
        this.userRequest.lastname = this.profileForm.value.cognome;
      }
      if (this.profileForm.value.data_nascita) {
        this.userRequest.dateOfBirth = this.profileForm.value.data_nascita?.toISOString();
      }
      //assicura che i campi password siano vuoti
      this.userRequest.newPassword = undefined;
      this.userRequest.oldPassword = undefined;
      return true;
    }
    this.addMessage('error', 'Compilare correttamente i campi del form');
    return false;
  }

  /**
   * Controlla che il form sia valido e dirty, e che la nuova password sia confermata
   * Se i controlli sono positivi, aggiorna i campi della richiesta utente con i valori del form
   * altrimenti ritorna false, ovvero il form non è valido
   * Controlla anche che il profilo sia salvato prima di cambiare la password
   * @returns 
   */
  private bindPasswordFormToUserRequest(): boolean {
    if(this.is_profile_form_editable){
      this.addMessage('error', 'Salvare le modifiche al profilo prima di cambiare la password');
      return false;
    }
    if (this.passwordForm.valid && this.passwordForm.dirty && this.isNewPasswordConfirmed()) {
      if (this.passwordForm.value.password_attuale) {
        this.userRequest.oldPassword = this.passwordForm.value.password_attuale;
      }
      if (this.passwordForm.value.nuova_password) {
        this.userRequest.newPassword = this.passwordForm.value.nuova_password;
      }
      return true;
    }
    this.addMessage('error', 'Compila correttamente i campi del form, e assicurati che la nuova password sia confermata correttamente');
    return false;
  }

  get IsProfileEditable(): boolean {
    return this.is_profile_form_editable;
  }

  private isNewPasswordConfirmed(): boolean {
    return this.passwordForm.value.nuova_password === this.passwordForm.value.conferma_password;
  }
}
