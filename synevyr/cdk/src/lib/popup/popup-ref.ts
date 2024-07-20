import { POPUP_SERVICE, PopupServiceInterface } from './popup.service';
import PopupConfig, { POPUP_CONFIG } from './popup-config';

import { computed,  inject, Signal, signal,  } from '@angular/core';
import {  OverlayRef } from '@angular/cdk/overlay';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, Subject, tap } from 'rxjs';


export function popup(
  config: Observable< PopupConfig> | Signal<PopupConfig>,
): PopupRef {
  const popupService = inject(POPUP_SERVICE);
  const defaultConfig = inject(POPUP_CONFIG, { optional: true }) ?? {}

  const config$ = config instanceof Observable ? config :  toObservable(config);

  return new PopupRef(popupService,config$.pipe(map(value=> { return { ...defaultConfig, ...value } })))
}

let popupInstanceId = 0;

export class PopupRef {
  private _id = `popup-id-${popupInstanceId++}`;


  _open$ = new Subject<OverlayRef>();
  open$ = this._open$.asObservable()
  overlayRef = toSignal(this._open$.asObservable())
  opened = computed(()=>!!this.overlayRef()?.hasAttached())

  config = signal<PopupConfig>(null)

  constructor(
    private _popupService: PopupServiceInterface,
    config: Observable<PopupConfig>,
  ) {
    config.pipe(
      map(value => {
      return {...value, ...{
          id: this._id,
          providers: [
            {
              provide: PopupRef,
              useValue: this,
            }
          ]
        }}
    }),
    tap((config: PopupConfig)=>{
      const overlayRef = this.overlayRef()
      if(overlayRef && this.overlayRef()?.hasAttached()  && config.positionStrategy) {
        overlayRef.updatePositionStrategy(config.positionStrategy);
        overlayRef.updatePosition();
      }
    })
    ).subscribe((value)=>{

      this.config.set(value)
    })
  }

  open() {

    this._open$.next(this._popupService.open(this.config()).overlayRef)

  }

  close() {
    this.overlayRef()?.detach()

  }
  toggle() {
    if (this.opened()) {
      this.close();
    } else {
      this.open()
    }
  }

}
