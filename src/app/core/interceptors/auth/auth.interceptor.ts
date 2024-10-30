import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  let refreshAttempted = false; // Flag para evitar reintentos infinitos

  if (req.url.includes('/sign-in') || req.url.includes('/sign-out'))
    return next(req);

  const accessToken = authService.getAccessToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  return next(authReq).pipe(
    catchError(err => {
      if (err.status === 401 && !refreshAttempted) {
        refreshAttempted = true;
        return authService.refreshToken().pipe(
          switchMap((response: any) => {
            authService.saveTokens(response.accessToken, response.refreshToken);

            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              }
            });

            return next(newReq);
          }),
          catchError(error => {
            authService.signOut();
            
            return throwError(() => new Error(error));
          })
        );
      }
      return throwError(() => new Error(err));
    })
  );
};
