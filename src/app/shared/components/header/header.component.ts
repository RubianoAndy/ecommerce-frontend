import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @ViewChild('dropdownMenu', { static: true }) dropdownMenu!: ElementRef;
  isMenuOpen = false;

  isDropdownOpen: { [key: string]: boolean } = {};

  constructor (
    private renderer: Renderer2,
  ) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMenuDropdown() {
    const dropdown = this.dropdownMenu.nativeElement;
    const isHidden = dropdown.classList.contains('hidden');

    if (isHidden) {
      this.renderer.removeClass(dropdown, 'hidden');
      this.renderer.setAttribute(dropdown, 'aria-expanded', 'true');
    } else {
      this.renderer.addClass(dropdown, 'hidden');
      this.renderer.setAttribute(dropdown, 'aria-expanded', 'false');
    }
  }

  toggleListDropdown(menu: string) {
    this.isDropdownOpen[menu] = !this.isDropdownOpen[menu];
  }
}
