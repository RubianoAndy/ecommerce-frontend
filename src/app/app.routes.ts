import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/components/home/home.component') },
    { path: 'sign-in', loadComponent: () => import('./core/components/sign-in/sign-in.component') },
    { path: 'sign-up', loadComponent: () => import('./core/components/sign-up/sign-up.component') },
    { path: 'recovery-password', loadComponent: () => import('./core/components/recovery-password/recovery-password.component') },
    { path: 'privacy-policy', loadComponent: () => import('./features/components/privacy-policy/privacy-policy.component') },
    { path: 'terms-and-conditions', loadComponent: () => import('./features/components/terms-and-conditions/terms-and-conditions.component') },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
