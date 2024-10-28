import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { TermsAndConditionsInformationComponent } from '../../../features/components/terms-and-conditions/terms-and-conditions-information/terms-and-conditions-information.component';
import { PrivacyPolicyInformationComponent } from '../../../features/components/privacy-policy/privacy-policy-information/privacy-policy-information.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NgIf,
    TermsAndConditionsInformationComponent,
    PrivacyPolicyInformationComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export default class SignUpComponent implements OnInit {
  logo = environment.dark_logo;
  form!: FormGroup;

  isPasswordVisible: boolean = false;

  isModalOpen = false;
  modalPart: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    // private router: Router,

    // private authService: AuthService,
    // private alertService: AlertService,
    // private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(data: any = null) {
    this.form = this.formBuilder.group({
      name_1: [data?.name_1 || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      lastname_1: [data?.lastname_1 || '', [ Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      email: [data?.email || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email ]],
      password: [data?.password || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ]],
    });
  }

  onSubmit() {
    var body = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    // if (this.form.valid && body)
    //   this.login(body);
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  openModal(event: Event, modalPart: string): void {
    this.modalPart = modalPart;
    event.preventDefault(); // Evita la navegación por defecto del enlace
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  
  /* private googleInitialize() {
    google.accounts.id.initialize({
      client_id: '408421446410-7incluce8okp0gcgg15g6v5l43pltt95.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });

    google.accounts.id.renderButton(
      document.getElementById("google-btn"), 
      {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 350
      }
    );
  } */

  /* handleLogin(response: any) {
    if(response){
      const payload = this.decodeToken(response.credential);

      // Petición para enviar el JWT Token al Backend
    }
  } */

  /* private decodeToken(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  } */
}
