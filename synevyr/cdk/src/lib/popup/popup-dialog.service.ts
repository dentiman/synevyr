import {inject, Injectable, TemplateRef} from '@angular/core';
import {Dialog, DialogRef} from "@angular/cdk/dialog";
import PopupRef from "./popup-ref";
import {ComponentType, Overlay} from "@angular/cdk/overlay";
import PopupConfig from "./popup-config";
import {PopupServiceInterface} from "./popup.service";

@Injectable({
  providedIn: 'root'
})
export class PopupDialogService implements PopupServiceInterface {

  private _dialog = inject(Dialog)
  private _overlay = inject(Overlay)
  open<C = unknown>( componentOrTemplateRef: ComponentType<C> | TemplateRef<C>, config: PopupConfig): PopupRef {

    const existDialogRef = this._dialog.getDialogById(config.id);
    if(existDialogRef) return existDialogRef;
    config = {...{
        hasBackdrop: true,
      }, ...config}
    const dialogRef =  this._dialog.open(componentOrTemplateRef,config)
    return dialogRef
  }

}
