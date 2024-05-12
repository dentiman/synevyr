import {inject, Injectable, TemplateRef} from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import {
  ComponentType,
  FlexibleConnectedPositionStrategy,
  Overlay,
  ViewportRuler
} from "@angular/cdk/overlay";
import PopupConfig, {DEFAULT_POPUP_MENU_CONFIG_DATA} from "./popup-config";
import {DROPDOWN_LEFT_POSITIONS} from "./popup-positions";
import {filter, fromEvent, takeUntil} from "rxjs";
import {PopupServiceInterface} from "./popup.service";

@Injectable({
  providedIn: 'root'
})
export class PopupMenuService implements PopupServiceInterface {

  private _dialog = inject(Dialog)
  private _overlay = inject(Overlay)
  private _viewportRuler: ViewportRuler = inject(ViewportRuler)
  open<C = unknown>( componentOrTemplateRef: ComponentType<C> | TemplateRef<C>, config: PopupConfig): DialogRef {
    const existDialogRef = this._dialog.getDialogById(config.id);

    if(existDialogRef) return existDialogRef;
    if(!config.elementRef) throw Error('elementRef is not provided in popup config')

    config = {...DEFAULT_POPUP_MENU_CONFIG_DATA,...config}

    if(!config.positionStrategy) {
      config.positionStrategy = this._getOverlayPositionStrategy(config);
    }

    if(config.hasOriginElementWidth) {
      config.width = config.elementRef.nativeElement.getBoundingClientRect().width
    }


    const dialogRef =  this._dialog.open(componentOrTemplateRef,config)

    if(config.hasOriginElementWidth) {
      this._viewportRuler.change().pipe(
          takeUntil( dialogRef.closed)
      ).subscribe(()=>{
        config.width = config.elementRef.nativeElement.getBoundingClientRect().width
        dialogRef.updatePosition()
      })
    }

    fromEvent(document, 'click')
        .pipe(
            filter(
                e =>
                    e.target != config.elementRef.nativeElement &&
                    !config.elementRef.nativeElement.contains(e.target as Element) &&
                    e.target != dialogRef.overlayRef.overlayElement &&
                    !dialogRef.overlayRef.overlayElement.contains(e.target as Element)
            ),
            takeUntil( dialogRef.closed)
        )
        .subscribe(() => {
          dialogRef.close()
        })

    return dialogRef
  }

  private _getOverlayPositionStrategy(config): FlexibleConnectedPositionStrategy {
    return this._overlay
        .position()
        .flexibleConnectedTo(config.elementRef)
        .withLockedPosition()
        .withGrowAfterOpen()
        .withPositions(this._getOverlayPositions(config));
  }


  private _getOverlayPositions(config) {
    return DROPDOWN_LEFT_POSITIONS;
  }

}
