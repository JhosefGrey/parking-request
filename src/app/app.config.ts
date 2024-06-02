import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNgVibeToastify } from '@ng-vibe/toastify';
import { authInterceptor } from '../shared/interceptors/auth.interceptor';
import { errorInterceptor } from '../shared/interceptors/error.interceptor';
import { provideNgVibeDialog } from '@ng-vibe/dialog';
import { loadingInterceptor } from '../shared/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor])), 
    provideNgVibeToastify(), 
    provideNgVibeDialog()]
};
