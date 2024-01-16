import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DEFAULT_DIALOG_CONFIG, DialogModule} from "@angular/cdk/dialog";
import {PopupDialogService} from "./popup-dialog.service";
import {PopupMenuService} from "./popup-menu.service";
import {DEFAULT_DIALOG_CONFIG_DATA} from "./popup-config";
import {POPUP_SERVICE, PopupService} from "./popup.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogModule
  ],
  providers: [
      {
          provide: DEFAULT_DIALOG_CONFIG,
          useValue: DEFAULT_DIALOG_CONFIG_DATA
      },
      {
          provide: POPUP_SERVICE,
          useClass: PopupService
      },
      PopupDialogService,
      PopupMenuService
  ]
})
export class PopupModule { }
