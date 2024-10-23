import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { LoadingService } from '../../../shared/services/loading/loading.service';

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
export class AuthComponent implements OnInit {
  logo = environment.light_logo;

  initLoading: number = 1;

  constructor (
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loadingService.show();

    setTimeout(() => {
      this.loadingService.hide();
    }, 1000 * this.initLoading);
  }
}
