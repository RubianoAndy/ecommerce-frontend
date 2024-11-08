import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

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
    AlertComponent,
    LoadingComponent,
    HeaderComponent,
    FooterComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  isVisible = true;

  excludedRoutes = [
    '/sign-in',
    '/sign-up',
    '/recovery-password',
    '/activate'
  ];

  constructor (
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isVisible = !this.excludedRoutes.some(route => event.url.includes(route));
    });
  }

  ngOnInit(): void {
    // Esta parte permite que los links del footer redirigan mostrando la parte alta de la página
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
