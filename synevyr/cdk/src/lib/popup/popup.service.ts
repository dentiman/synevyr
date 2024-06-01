import {inject, Injectable, InjectionToken, TemplateRef} from '@angular/core';
import {Dialog, DialogRef} from "@angular/cdk/dialog";
import {ComponentType} from "@angular/cdk/overlay";
import PopupConfig from "./popup-config";
import {PopupDialogService} from "./popup-dialog.service";
import {PopupMenuService} from "./popup-menu.service";

export interface PopupServiceInterface {
  open( popupConfig: PopupConfig): DialogRef
}

export const POPUP_SERVICE = new InjectionToken<PopupServiceInterface>(
    'POPUP_SERVICE'
)

@Injectable({
  providedIn: 'root'
})
export class PopupService implements PopupServiceInterface  {

  private _dialog = inject(PopupDialogService)
  private _menu = inject(PopupMenuService)

  open<C = unknown>( popupConfig: PopupConfig): DialogRef {
      if(popupConfig.popupRole === 'dialog') return  this._dialog.open(popupConfig)
      if(popupConfig.popupRole === 'menu') return  this._menu.open(popupConfig)
      return  this._menu.open(popupConfig)
  }

}
