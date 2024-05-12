import { POPUP_SERVICE, PopupServiceInterface } from './popup.service';
import PopupConfig, { POPUP_CONFIG } from './popup-config';

import { computed, ElementRef, inject, Signal, signal, TemplateRef, WritableSignal } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay';
import { DialogRef } from '@angular/cdk/dialog';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, Subject } from 'rxjs';


export function popup(
  componentOrTemplateRef: Signal<ComponentType<any> | TemplateRef<any>| undefined>,
  originElementRef: Signal<ElementRef<HTMLElement>>,
  config: PopupConfig = {}
) {
  const popupService = inject(POPUP_SERVICE);
  const popupConfig = { ...inject(POPUP_CONFIG, { optional: true }),...config };

  return new PopupRef(popupService,popupConfig,componentOrTemplateRef,originElementRef)
}

let popupInstanceId = 0;

export class PopupRef {

  private _cdkDialogRef? = signal<DialogRef>(null)
  private _id = `popup-id-${popupInstanceId++}`;
  opened = computed(()=>!!this._cdkDialogRef()?.overlayRef.hasAttached())
  closed$ = toObservable( this.opened).pipe(filter((value)=> value === false))
  overlayRef = computed(()=> {
   return this._cdkDialogRef()?.overlayRef;
  })

  open$ = new Subject<DialogRef>();

  config: WritableSignal<PopupConfig>

  constructor(
    private _popupService: PopupServiceInterface,
    config: PopupConfig,
    private _componentOrTemplateRef: Signal<ComponentType<any> | TemplateRef<Element>>,
    private _originElementRef: Signal<ElementRef<HTMLElement>>
  ) {
    this.config =  signal<PopupConfig>(config)
  }

  open() {
    const config = {...this.config() ?? {}, ...{
        elementRef: this._originElementRef(),
        id: this._id,
        providers: [
          {
            provide: PopupRef,
            useValue: this,
          }
        ]
      }}
    this._cdkDialogRef.set(this._popupService.open(this._componentOrTemplateRef(),  config))
  }

  close() {
    this._cdkDialogRef()?.close()
    this._cdkDialogRef.set(null)
  }
  toggle() {
    if (this.opened()) {
      this.close();
    } else {
      this.open()
    }
  }

}
