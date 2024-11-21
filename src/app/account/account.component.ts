import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-account',
    imports: [
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
    ],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export class AccountComponent {

  adminMenuOptions = [
    { label: 'Usuarios', url: 'users', icon: 'person' },
  ];

}
