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
  PopupService
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
    PopupDialogService,
    PopupMenuService,
    DateAdapter,
    CalendarDateAdapter
  ],
};
