import { Route } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout.component';
import { DatepickerPageComponent } from './pages/datepicker/datepicker.component';
import { ListPageComponent } from './pages/list/list-page.component';
import { SelectPageComponent } from './pages/select/select-page.component';
import { AutocompletePageComponent } from './pages/autocomplete/autocomplete-page.component';
import { DropdownPageComponent } from './pages/dropdown/dropdown-page.component';
import { ButtonPageComponent } from './pages/button/button-page.component';
import { ChipPageComponent } from './pages/chip/chip-page.component';
import { InputPageComponent } from './pages/input/input-page.component';

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
      {
        path: 'select',
        component: SelectPageComponent
      },
      {
        path: 'au',
        component: AutocompletePageComponent
      },
      {
        path: 'dropdown',
        component: DropdownPageComponent
      },
      {
        path: 'button',
        component: ButtonPageComponent
      },
      {
        path: 'chip',
        component: ChipPageComponent
      },
      {
        path: 'input',
        component: InputPageComponent
      },
    ]
  }
];
