import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit {
  logo = environment.darkLogo;
  isLoading = false;

  constructor (
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }
}