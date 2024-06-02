import { HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { inject } from '@angular/core';
import { ToastTypeEnum } from '@ng-vibe/toastify';
import { AuthService } from '../../app/auth/pages/login/services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const sharedService = inject(SharedService); 
  const authService = inject(AuthService); // Inyecta el servicio AuthService
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors         
          sharedService.mensaje("Sesión expirada", ToastTypeEnum.DANGER);
          authService.logOut();
          
        } else {
          // Handle other HTTP error codes
          sharedService.mensaje(err.error.error, ToastTypeEnum.DANGER);
        }
      } else {
        // Handle non-HTTP errors
        sharedService.mensaje(err.error.error, ToastTypeEnum.DANGER);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
