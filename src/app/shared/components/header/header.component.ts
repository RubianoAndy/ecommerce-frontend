import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../core/services/auth/auth.service';
import { AlertService } from '../../services/alert/alert.service';
import { ProfileService } from '../../../account/services/profile/profile.service';
import { DarkModeService } from '../../services/dark-mode/dark-mode.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  logo = environment.darkLogo;
  avatar = 'assets/images/avatar/Avatar.png';

  private unsubscribe$ = new Subject<void>();
  
  isAccountMenuOpen = false;
  profile: any = null;

  constructor (
    private authService: AuthService,
    private profileService: ProfileService,
    private alertService: AlertService,
    private darkModeService: DarkModeService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(darkMode => {
      this.logo = darkMode ? environment.lightLogo : environment.darkLogo;
      this.changeDetectorRef.detectChanges();   // Forzar a la detención del cambio del logo en el ciclo de vida
    });

    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated)
        this.getProfile();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProfile() {
    this.profileService.getProfile().subscribe({
      next: (response) => {
        this.profile = response;
      },
      error: () => {
        // console.error(response.error);
      }
    });
  }

  signOut() {
    var alertBody = null;

    this.authService.signOut().subscribe({
      next: (response) => {
        alertBody = {
          type: 'okay',
          title: '¡Esperamos verte pronto!',
          message: response.message,
        }
        this.profile = null;
        // this.alertService.showAlert(alertBody);
      },
      error: (response) => {
        alertBody = {
          type: 'error',
          title: 'Error',
          message: response.error.message,
        }
        this.alertService.showAlert(alertBody);
      }
    });
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }
}