import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiresAuth = route.data['requiresAuth'] || false;

  if (authService.isAuthenticated())
    return requiresAuth ? true : router.navigate(['/']);
  else
    return requiresAuth ? router.navigate(['sign-in']) : true;
};