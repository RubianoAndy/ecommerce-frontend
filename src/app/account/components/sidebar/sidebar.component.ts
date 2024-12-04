import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  adminMenuOptions = [
    { label: 'Roles', url: 'roles', icon: 'person' },
    { label: 'Usuarios', url: 'users', icon: 'person' },
  ];

}
