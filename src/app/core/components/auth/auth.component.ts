import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  logo = environment.light_logo;
}
