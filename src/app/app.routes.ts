import { Route } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout.component';
import { DatepickerPageComponent } from './pages/datepicker/datepicker.component';
import { ListPageComponent } from './pages/list/list-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'datepicker',
        component: DatepickerPageComponent
      },
      {
        path: 'list',
        component: ListPageComponent
      },
    ]
  }
];
