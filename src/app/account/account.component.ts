import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-account',
    imports: [
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      BreadcrumbComponent,
    ],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export class AccountComponent {

  adminMenuOptions = [
    { label: 'Roles', url: 'roles', icon: 'person' },
    { label: 'Usuarios', url: 'users', icon: 'person' },
  ];

}
