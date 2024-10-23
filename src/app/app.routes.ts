import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/components/home/home.component') },
    { path: 'login', loadComponent: () => import('./core/components/login/login.component') },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
