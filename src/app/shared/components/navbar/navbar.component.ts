import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { DarkModeToggleComponent } from '../dark-mode-toggle/dark-mode-toggle.component';
import { DarkModeService } from '../../services/dark-mode/dark-mode.service';
import { Subject } from 'rxjs';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
    selector: 'app-navbar',
    imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    DarkModeToggleComponent,
    SidebarComponent,
],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  isSubMenuOpen = false;

  profile: any = null;

  navbarOptions = [
    { label: 'Inicio', url: '/', icon: 'home' },
    { label: 'Faq', url: '/faq', icon: 'psychology' },
    { label: 'Contacto', url: '/contact', icon: 'person' },
  ];

  categories = [
    { label: 'Plantas', url: '/#'},
    { label: 'Sustratos', url: '/#'},
    { label: 'Materas', url: '/#'},
    { label: 'Recordatorios', url: '/#'},
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
