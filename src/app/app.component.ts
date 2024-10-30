import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { NgIf } from '@angular/common';

import { AlertComponent } from './shared/components/alert/alert.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { filter } from 'rxjs';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    AlertComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isVisible = true;

  excludedRoutes = [
    '/sign-in',
    '/sign-up',
    '/recovery-password'
  ];

  constructor (
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isVisible = !this.excludedRoutes.includes(event.url);
    });
  }
}
