import { computed, Directive, effect, ElementRef, inject, input, signal } from '@angular/core';
import { DefaultPopupPortalComponent } from './default-popup-portal.component';
import { popup } from './popup-ref';
import { POPUP_SERVICE } from './popup.service';
import { PopupMenuService } from './popup-menu.service';
import { fromEvent, Subject, takeUntil, timer } from 'rxjs';
import PopupConfig from './popup-config';
import { ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay } from '@angular/cdk/overlay';

export type TooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';

@Directive({
  selector: '[cdkTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'open()',
    '(mouseleave)': 'close()',
  },
  providers: [
    {
      provide: POPUP_SERVICE,
      useFactory: (popupMenuService: PopupMenuService)=>{ return popupMenuService; },
      deps: [PopupMenuService]
    }
  ]
})
export class CdkTooltipDirective  {
  private _overlay = inject(Overlay)
  position = input<TooltipPosition>('above',{alias: 'tooltipPosition'})
  message = input<string>(null,{alias: 'cdkTooltip'})
  componentOrTemplateRef = signal(DefaultPopupPortalComponent)
  elementRef = inject(ElementRef)

  config = computed<PopupConfig>(()=>{
     return {
       data: {message: this.message()},
       positionStrategy: this._getOverlayPositionStrategy()
     }
  })


  popupRef = popup(this.componentOrTemplateRef,signal(this.elementRef).asReadonly(),{data: {message: this.message}})

  openDelay = input<number>(500)
  closeDelay = input<number>(500)


  interactionRequest = new Subject<'open'|'close'>()

  constructor() {
      effect(()=>{
        const elementRef = this.popupRef.overlayRef()?.overlayElement
        if(elementRef) {
          fromEvent(elementRef,'mouseleave').pipe(
            takeUntil(this.popupRef.closed$)
          ).subscribe(()=>{this.close()})

          fromEvent(elementRef,'mouseenter').pipe(
            takeUntil(this.popupRef.closed$)
          ).subscribe(()=>{this.open()})
        }
      })
  }

  open() {
    this.interactionRequest.next('open')
    timer(this.openDelay()).pipe(
      takeUntil(this.interactionRequest)
    ).subscribe(()=>{
        this.popupRef.open();
      })
  }
  close() {
    this.interactionRequest.next('close')
    timer(this.closeDelay()).pipe(
      takeUntil(this.interactionRequest)
    ).subscribe(()=>{
      this.popupRef.close();
    })
  }

  private _getOverlayPositionStrategy(): FlexibleConnectedPositionStrategy {
    return this._overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withLockedPosition()
      .withGrowAfterOpen()
      .withPositions(this._getOverlayPositions());
  }


  private _getOverlayPositions(): ConnectedPosition[] {
    return [
      {originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top'},
      {originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom'},
    ];
  }
}
