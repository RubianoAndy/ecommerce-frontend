import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { environment } from '../../../../environments/environment.development';

import { AuthService } from '../../services/auth/auth.service';
import { AlertService } from '../../services/alert/alert.service';
import { LoadingService } from '../../../shared/services/loading/loading.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgClass,
    NgIf
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export default class SignInComponent implements OnInit {
  logo = environment.dark_logo;
  form!: FormGroup;

  isPasswordVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,

    private authService: AuthService,
    private alertService: AlertService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(data: any = null) {
    this.form = this.formBuilder.group({
      email: [data?.email || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.email ]],
      password: [data?.password || '', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ]],
    });
  }

  onSubmit() {
    var body = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    if (this.form.valid && body)
      this.signIn(body);
  }

  signIn(body: any): void {
    this.loadingService.show();
    var alertBody = null;

    this.authService.signIn(body).subscribe({
      next: (response) => {
        alertBody = {
          type: 'okay',
          title: 'Bienvenido',
          message: response.message,
        }

        this.alertService.showAlert(alertBody);
        this.loadingService.hide();
        // this.router.navigate(['/']);
      },
      error: (response) => {
        alertBody = {
          type: 'error',
          title: 'Credenciales incorrectas',
          message: response.error.message,
        }

        this.alertService.showAlert(alertBody);
        this.loadingService.hide();
      }
    });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
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
