import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, switchMap, throwError, zip } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  var ignoreRoutes = [
    '/refresh-token',
    '/sign-in',
    '/sign-out',
    '/generate-code',
    '/verify-code',
  ];

  // Deja pasar la petición sin interceptarla, para evitar un bucle infinito
  if (ignoreRoutes.some(route => req.url.includes(route)))
    return next(req);

  const accessToken = authService.getAccessToken();
  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  return next(request).pipe(
    catchError((err: any) => {
      if (err.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(response => {
            authService.setAccessToken(response.accessToken);
            const newRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              }
            });

            return next(newRequest);
          }),
          catchError(error => {
            authService.signOut();
            return throwError(() => new Error(error)); // Propaga el error
          })
        );
      }
      return throwError(() => new Error(err)); // Propaga el error
    })
  );
};
