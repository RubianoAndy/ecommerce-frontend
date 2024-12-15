import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DarkModeToggleComponent } from '../dark-mode-toggle/dark-mode-toggle.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CategoriesService } from '../../../account/services/categories/categories.service';

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
export class NavbarComponent implements OnInit {
  categories: any[] = [];

  isMenuOpen = false;
  isSubMenuOpen = false;

  profile: any = null;

  navbarOptions = [
    { label: 'Inicio', url: '/', icon: 'home' },
    { label: 'Faq', url: '/faq', icon: 'psychology' },
    { label: 'Contacto', url: '/contact', icon: 'person' },
  ];

  constructor (
    private categoriesService: CategoriesService,
  ) {
    this.getCategories();
  }

  ngOnInit(): void {
      
  }

  async getCategories() {
    await this.categoriesService.getCategoriesSmall().subscribe(
      (response) => {
        this.categories = response;
      }
    )
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
