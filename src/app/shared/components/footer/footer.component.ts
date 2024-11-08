import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  logo = environment.darkLogo;
  page = environment.siteName;
  currentYear = environment.currentYear;
  email = environment.email;

  constructor (
    private router: Router,
  ) { }

  navigateTo(url: string) {
    this.router.navigate([url]).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
