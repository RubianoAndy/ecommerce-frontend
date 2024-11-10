import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { filter } from 'rxjs';

import { AlertComponent } from './shared/components/alert/alert.component';
import { LoadingComponent } from './shared/components/loading/loading.component';

import { HeaderComponent } from './shared/components/header/header.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AlertComponent,
    LoadingComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  isHeaderVisible = true;
  isFooterVisible = true;

  headerExcludedRoutes = [
    '/sign-in',
    '/sign-up',
    '/recovery-password',
    '/activate'
  ];

  footerExcludedRoutes = [...this.headerExcludedRoutes, '/account'];

  constructor (
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHeaderVisible = !this.headerExcludedRoutes.some(route => event.url.includes(route));
      this.isFooterVisible = !this.footerExcludedRoutes.some(route => event.url.includes(route));
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
