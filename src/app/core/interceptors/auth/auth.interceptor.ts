import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  let authReq = req;
  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        return authService.refreshTokens().pipe(
          switchMap(() => {
            const newAccessToken = authService.getAccessToken();
            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });
            return next(newAuthReq);
          }),
          catchError(err => {
            // Si falla la actualización, cerramos sesión
            authService.signOut();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
