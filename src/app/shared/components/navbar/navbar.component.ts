import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { PrivacyPolicyInformationComponent } from "../../../features/components/privacy-policy/privacy-policy-information/privacy-policy-information.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
    PrivacyPolicyInformationComponent
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
