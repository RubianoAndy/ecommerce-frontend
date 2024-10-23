import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/components/home/home.component') },
    { path: 'auth', loadChildren: () => import('./core/components/auth/auth.routes').then(m => m.AuthRoutes) },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
