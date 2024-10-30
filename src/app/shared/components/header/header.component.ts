import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoadingService } from '../../services/loading/loading.service';
import { AlertService } from '../../services/alert/alert.service';
import { ProfileService } from '../../../features/services/profile/profile.service';

interface profileInfo {
  id: number,
  name_1: string;
  name_2: string;
  lastname_1: string;
  lastname_2: string;
  dniType: string,
  dni: string,
  prefix: string,
  mobile: string,
  email: string;
}

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
  logo = environment.darkLogo;
  isAuthenticated = false;

  isMenuOpen = false;
  isSubMenuOpen = false;
  isAccountMenuOpen = false;

  profile: profileInfo | null = null;
  // profile: any = null;

  constructor (
    private authService: AuthService,
    private profileService: ProfileService,
    private loadingService: LoadingService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    if (!this.profileService.getCurrentProfile())
      this.profileService.getProfile();

    this.loadProfile();
  }

  loadProfile() {
    this.profileService.profile$.subscribe(profile => {
      this.profile = profile;
      if (profile)
        this.isAuthenticated = true; 
    });
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
        this.alertService.showAlert(alertBody);
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