import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../shared/components/breadcrumb/breadcrumb.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
    selector: 'app-account',
    imports: [
      RouterOutlet,
      BreadcrumbComponent,
      SidebarComponent,
    ],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export default class AccountComponent {

}
