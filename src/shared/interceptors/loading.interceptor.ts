import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { SharedService } from '../services/shared.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const sharedService = inject(SharedService); // Inyecta el servicio AuthService
  let totalRequest = 0;

  sharedService.setLoading.next(true);
  totalRequest++;
  return next(req).pipe(
    finalize(() => {
      totalRequest--;

      if (totalRequest === 0) {
        setTimeout(() => {
          sharedService.setLoading.next(false);
        }, 800);
      }

    })
  )

};
