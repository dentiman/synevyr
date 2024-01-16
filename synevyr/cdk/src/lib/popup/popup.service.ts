import {inject, Injectable, InjectionToken, TemplateRef} from '@angular/core';
import {Dialog, DialogRef} from "@angular/cdk/dialog";
import PopupRef from "./popup-ref";
import {ComponentType, Overlay} from "@angular/cdk/overlay";
import PopupConfig from "./popup-config";
import {PopupDialogService} from "./popup-dialog.service";
import {PopupMenuService} from "./popup-menu.service";

export interface PopupServiceInterface {
  open<C = unknown>( componentOrTemplateRef: ComponentType<C> | TemplateRef<C>, popupConfig: PopupConfig): PopupRef
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

  open<C = unknown>( componentOrTemplateRef: ComponentType<C> | TemplateRef<C>, popupConfig: PopupConfig): PopupRef {
      if(popupConfig.popupRole === 'dialog') return  this._dialog.open(componentOrTemplateRef,popupConfig)
      if(popupConfig.popupRole === 'menu') return  this._menu.open(componentOrTemplateRef,popupConfig)
      return  this._dialog.open(componentOrTemplateRef,popupConfig)
  }

}
