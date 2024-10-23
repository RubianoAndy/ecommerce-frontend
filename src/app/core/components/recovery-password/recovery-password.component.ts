import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { LoadingService } from '../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NgIf,
  ],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export default class RecoveryPasswordComponent {
  formSelected: string = 'form_2'; // 'form_2'
  logo = environment.dark_logo;
  form_1!: FormGroup;
  form_2!: FormGroup;

  user_id: number = 0;
  isPasswordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    // private router: Router,

    // private forgotPasswordService: ForgotPasswordService,
    // private alertService: AlertService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.createForm1();
    this.createForm2();
  }

  createForm1(data: any = null) {
    this.form_1 = this.formBuilder.group({
      email: [data?.email || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email ]],
    });
  }

  createForm2(data: any = null) {
    this.form_2 = this.formBuilder.group({
      code_1: [data?.code_1 || '', [ Validators.required ]],
      code_2: [data?.code_2 || '', [ Validators.required ]],
      code_3: [data?.code_3 || '', [ Validators.required ]],
      code_4: [data?.code_4 || '', [ Validators.required ]],
      code_5: [data?.code_5 || '', [ Validators.required ]],
      code_6: [data?.code_6 || '', [ Validators.required ]],
      code_7: [data?.code_7 || '', [ Validators.required ]],

      password: [data?.password || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ]],
    });
  }

  onSubmitForm1() {
    var body = {
      email: this.form_1.value.email,
      language: localStorage.getItem('language'),
    };
    
    if (this.form_1.valid && body)
      this.generateCode(body);
  }

  onSubmitForm2() {
    var total_codes = 7;    // Cantidad de dígitos a llenar en el formulario
    var code = '';

    for (var i = 0; i < total_codes; i++){
      var name = 'code_' + (i + 1);
      code += this.form_2.value[name];
    }

    var body = {
      user_id: this.user_id,  // (this.user_id != 0) ? this.user_id : null
      code: code,
      new_password: this.form_2.value.new_password,
      language: localStorage.getItem('language'),
    };

    if (this.form_2.valid && body)
      this.changePasswordFromCode(body);
  }

  generateCode(body: any): void {
    this.loadingService.show();
    var alertBody = null;

    /* this.forgotPasswordService.generateCode(body).subscribe({
      next: (response) => {
        this.user_id = response.user_id;

        alertBody = {
          type: 'okay',
          title: 'check your email',
          message: response.message,
        }

        this.alertService.showAlert(alertBody);
        this.loadingService.hide();
        this.form_type = 'form_2';
      },
      error: (response) => {
        alertBody = {
          type: 'warning',
          title: 'warning',
          message: response.error.message,
        }

        this.alertService.showAlert(alertBody);
        this.loadingService.hide();
        this.form_1.reset();
      }
    }); */
  }

  changePasswordFromCode(body: any): void {
    this.loadingService.show();
    var alertBody = null;

    /* this.forgotPasswordService.changePasswordFromCode(body).subscribe({
      next: (response) => {
        alertBody = {
          type: 'okay',
          title: 'congratulations',
          message: response.message,
        }

        this.alertService.showAlert(alertBody);
        this.loadingService.hide();
        this.router.navigate(['auth/login']);
      },
      error: (response) => {
        alertBody = {
          type: 'error',
          title: 'error',
          message: response.error.message,
        }

        this.alertService.showAlert(alertBody);
        this.loadingService.hide();
        this.form_2.reset();
        this.form_type = 'form_1';
      }
    }); */
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  focusNextInput(event: Event, nextInputId: string | null): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === input.maxLength && nextInputId) {
      const nextInput = document.getElementById(nextInputId);
      nextInput?.focus();
    }
  }

  handlePaste(event: ClipboardEvent): void {
    const pasteData = event.clipboardData?.getData('text') || '';
    if (pasteData.length === 7) {
      for (var i = 0; i < pasteData.length; i++){
        var name = 'code_' + (i + 1);
        this.form_2.controls[name].setValue(pasteData.charAt(i));
      }
      (document.getElementById('code_7') as HTMLInputElement)?.focus();
      
      event.preventDefault();
    }
  }

  handleKeyDown(event: KeyboardEvent, prevInputId: string | null): void {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && input.value.length === 0 && prevInputId) {
      const prevInput = document.getElementById(prevInputId) as HTMLInputElement;
      prevInput.focus();
      prevInput.value = '';  // Borrar el valor anterior
      event.preventDefault();
    }
  }
}
