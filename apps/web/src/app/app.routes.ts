import { Route } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { LogedGuard } from './modules/auth/guards/loged.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'stores',
    title: 'Partners',
    loadComponent: () =>
      import('./modules/home/home.component').then((mod) => mod.HomeComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./stores/stores.component').then(
            (mod) => mod.StoresComponent
          ),
        data: {
          navData: {
            title: 'Lomi partners',
          },
        },
      },
    ],
  },
  {
    path: 'tasks',
    title: 'Tasks',
    loadComponent: () =>
      import('./modules/home/home.component').then((mod) => mod.HomeComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./tasks/tasks.component').then((mod) => mod.TasksComponent),
        data: {
          navData: {
            title: 'Procesamiento en lotes',
          },
        },
      },
    ],
  },
  {
    path: '',
    title: 'Admin',
    loadComponent: () =>
      import('./modules/home/home.component').then((mod) => mod.HomeComponent),
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./modules/home/pages/stockItems/stock-items.component').then(
            (mod) => mod.StockItemsComponent
          ),
        data: {
          navData: {
            title: 'Catalogo',
          },
        },
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/home/pages/dashboard/dashboard.component').then(
            (mod) => mod.DashboardComponent
          ),
        data: {
          navData: {
            title: 'dashboard',
          },
        },
      },
    ],
    data: {
      headerRoot: true,
    },
    canActivate: [LogedGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/auth.component').then((mod) => mod.AuthComponent),
    title: 'Login',
  },
];
