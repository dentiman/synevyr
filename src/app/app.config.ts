import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {DEFAULT_DIALOG_CONFIG} from "@angular/cdk/dialog";
import {
  DateAdapter,
  CalendarDateAdapter,
  DEFAULT_DIALOG_CONFIG_DATA,
  POPUP_SERVICE,
  PopupDialogService,
  PopupMenuService,
  PopupService, CALENDAR_DATE_FORMAT
} from "@synevyr/cdk";


export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(appRoutes),
    {
      provide: DEFAULT_DIALOG_CONFIG,
      useValue: DEFAULT_DIALOG_CONFIG_DATA
    },
    {
      provide: POPUP_SERVICE,
      useClass: PopupService
    },
    {
      provide: CALENDAR_DATE_FORMAT,
      useValue: 'yyyy-MM-dd'
    },
    PopupDialogService,
    PopupMenuService,
    DateAdapter,
    CalendarDateAdapter
  ],
};
