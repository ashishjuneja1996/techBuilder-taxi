import { Routes } from '@angular/router';

import { ProfileLayoutComponent } from './layout/layout.component';
import { ProfileOverviewComponent } from './overview/overview.component';
import { ProfileSettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: ProfileLayoutComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: ProfileOverviewComponent, data: { title: 'Overview - Taxi Service' } },
      { path: 'settings', component: ProfileSettingsComponent , data: { title: 'Settings - Taxi Service' }},
    ],
  },
];
