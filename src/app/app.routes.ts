import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then((r) => r.AUTH_ROUTES)
    },
    {
        path: 'home',
        loadChildren: () => import('./content/content.routes').then((r) => r.CONTENT_ROUTES)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    }
];
