import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoadingService } from '../../services/loading/loading.service';
import { AlertService } from '../../../core/services/alert/alert.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  logo = environment.dark_logo;
  isAuthenticated = false;

  isMenuOpen = false;
  isSubMenuOpen = false;
  isAccountMenuOpen = false;

  constructor (
    private authService: AuthService,
    private loadingService: LoadingService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();  
  }

  signOut() {
    this.loadingService.show();
    var alertBody = null;

    this.authService.signOut().subscribe({
      next: (response) => {
        alertBody = {
          type: 'okay',
          title: '¡Esperamos verte pronto!',
          message: response.message,
        }
        this.isAuthenticated = false;
        // this.alertService.showAlert(alertBody);
        this.loadingService.hide();
      },
      error: (response) => {
        alertBody = {
          type: 'error',
          title: 'Error',
          message: response.error.message,
        }
        this.isAuthenticated = true;
        // this.alertService.showAlert(alertBody);
        this.loadingService.hide();
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }
}