import { Routes } from '@angular/router';
import { authGuard } from '@core';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { Error403Component } from './routes/sessions/403.component';
import { Error404Component } from './routes/sessions/404.component';
import { Error500Component } from './routes/sessions/500.component';
import { LoginComponent } from './routes/sessions/login/login.component';
import { RegisterComponent } from './routes/sessions/register/register.component';
import { RouteNameService } from '@shared/services/route-name.service';
import { ClientOverviewComponent } from './routes/operators/client-overview/client-overview.component';
import { OperatorsComponent } from './routes/operators/operators.component';

const routeNameService = new RouteNameService(); // Initialize the service
const routeData = routeNameService.getRouteDataForDomain(); // Fetch dynamic route data

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: routeData.dashboardTitle } },
      { path: 'operators', component: OperatorsComponent, data: { title: routeData.dashboardTitle } },
      { 
        path: 'operator/client-overview/:clientname', 
        component: ClientOverviewComponent, 
        data: { title: routeData.dashboardTitle } 
      },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },

      {
        path: 'profile',
        loadChildren: () => import('./routes/profile/profile.routes').then(m => m.routes),
        data: { title: routeData.profileTitle }
      },


    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, data: { title: routeData.loginTitle } },
      { path: 'register', component: RegisterComponent, data: { title: routeData.registerTitle } },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
