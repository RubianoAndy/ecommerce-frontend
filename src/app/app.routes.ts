import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/components/home/home.component') },
    { path: 'sign-in', loadComponent: () => import('./core/components/sign-in/sign-in.component') },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
