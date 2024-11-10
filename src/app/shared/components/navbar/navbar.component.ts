import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  logo = environment.darkLogo;

  isMenuOpen = false;
  isSubMenuOpen = false;
  isHovered = false;

  profile: any = null;

  navbarOptions = [
    { label: 'Inicio', url: '/' },
    { label: 'Faq', url: '/faq' },
    { label: 'Contacto', url: '/contact' },
  ];

  categories = [
    { label: 'Plantas', url: '/#'},
    { label: 'Sustratos', url: '/#'},
    { label: 'Materas', url: '/#'},
    { label: 'Recordatorios', url: '/#'},
  ];

  constructor () { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
