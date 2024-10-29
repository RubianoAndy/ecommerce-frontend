import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const accessToken = authService.getAccessToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: accessToken,
    }
  });

  return next(authReq).pipe(
    catchError(err => {
      return authService.refreshToken().pipe(
        switchMap((response: any) => {
          authService.saveTokens(response.accessToken, response.refreshToken);

          const newReq = req.clone({
            setHeaders: {
              Authorization: response.accessToken,
            }
          });

          return next(newReq);
        }),
        catchError(error => {
          authService.signOut();

          return throwError(() => new Error(error));
        })
      );
    })
  );
};
