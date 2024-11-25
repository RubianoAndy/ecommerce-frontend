import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-change-password',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {
  form!: FormGroup;

  loading: boolean = false;

  isCurrentPasswordVisible: boolean = false;
  isNewPasswordVisible: boolean = false;
  isCurrentPasswordFocused: boolean = false;
  isNewPasswordFocused: boolean = false;

  currentPasswordCriteria = {
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasNumber: false,
    isValidLength: false
  };

  newPasswordCriteria = {
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    hasNumber: false,
    isValidLength: false
  };

  constructor (
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(data: any = null) {
    this.form = this.formBuilder.group({
      currentPassword: [data?.currentPassword || '', [ Validators.required, passwordValidator() ]],
      newPassword: [data?.newPassword || '', [ Validators.required, passwordValidator() ]],
    });
  }

  onSubmitForm() {
    
  }

  togglePasswordVisibility(formName: string): void {
    const visibilityMap: any = {
      currentPassword: () => { this.isCurrentPasswordVisible = !this.isCurrentPasswordVisible; },
      newPassword: () => { this.isNewPasswordVisible = !this.isNewPasswordVisible; }
    };

    if (visibilityMap[formName])
      visibilityMap[formName]();
    // else
    //   console.warn(`No se puede mostrar contraseña para ${formName}`);
  }

  onPasswordFocus(formName: string): void {
    if (formName === 'currentPassword')
      this.isCurrentPasswordFocused = true;
    else if (formName === 'newPassword')
      this.isNewPasswordFocused = true;
  }

  onPasswordBlur(formName: string): void {
    if (formName === 'currentPassword')
      this.isCurrentPasswordFocused = false;
    else if (formName === 'newPassword')
      this.isNewPasswordFocused = false;
  }

  checkPasswordCriteria(password: string, formName: string): void {
    const criteria = {
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNumber: /\d/.test(password),
      isValidLength: password.length >= 8 && password.length <= 20,
    };

    if (formName === 'currentPassword')
      this.currentPasswordCriteria = criteria;
    else if (formName === 'newPassword')
      this.newPasswordCriteria = criteria;
  }

  onCurrentPasswordChange(event: Event): void {
    const password = (event.target as HTMLInputElement).value;
    this.checkPasswordCriteria(password, 'currentPassword');
  }

  onNewPasswordChange(event: Event): void {
    const password = (event.target as HTMLInputElement).value;
    this.checkPasswordCriteria(password, 'newPassword');
  }
}