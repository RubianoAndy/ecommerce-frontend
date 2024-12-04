import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { Subject } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode/dark-mode.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() showLogo: boolean = false;
  @Output() sidebarEmitter = new EventEmitter<void>();
  
  logo = environment.darkLogo;

  adminMenuOptions = [
    { label: 'Roles', url: '/account/roles', icon: 'person' },
    { label: 'Usuarios', url: '/account/users', icon: 'person' },
  ];

  private unsubscribe$ = new Subject<void>();

  constructor (
    private darkModeService: DarkModeService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(darkMode => {
      this.logo = darkMode ? environment.lightLogo : environment.darkLogo;
      this.changeDetectorRef.detectChanges();   // Forzar a la detención del cambio del logo en el ciclo de vida
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  emitEvent(): void {
    this.sidebarEmitter.emit();
  }
}
