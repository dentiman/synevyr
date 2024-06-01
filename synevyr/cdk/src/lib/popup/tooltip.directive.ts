import { computed, Directive,  ElementRef, inject, input, signal } from '@angular/core';
import { DefaultPopupPortalComponent } from './default-popup-portal.component';
import { popup } from './popup-ref';
import { POPUP_SERVICE } from './popup.service';
import { PopupMenuService } from './popup-menu.service';
import { fromEvent, Subject, takeUntil, timer } from 'rxjs';
import { FlexibleConnectedPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { getConnectedPosition, OverlayPosition } from './popup-positions';

@Directive({
  selector: '[cdkTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'open()',
    '(mouseleave)': 'close()'
  },
  providers: [
    {
      provide: POPUP_SERVICE,
      useFactory: (popupMenuService: PopupMenuService) => {
        return popupMenuService;
      },
      deps: [PopupMenuService]
    }
  ]
})
export class CdkTooltipDirective {
  private _overlay = inject(Overlay);
  position = input<OverlayPosition>('above', { alias: 'tooltipPosition' });
  message = input<string>(null, { alias: 'cdkTooltip' });
  componentOrTemplateRef = signal(DefaultPopupPortalComponent);
  elementRef = inject(ElementRef);


  popupRef = popup(computed<any>(() => {
    return {
      componentOrTemplateRef: this.componentOrTemplateRef(),
      elementRef: this.elementRef,
      data: { message: this.message() },
      positionStrategy: this._getOverlayPositionStrategy()
    };
  }));


  openDelay = input<number>(500);
  closeDelay = input<number>(500);


  private _interactionRequest = new Subject<'open' | 'close'>();

  constructor() {
    this.popupRef.open$.subscribe((overlayRef) => {
      const elementRef = overlayRef.overlayElement;
      if (elementRef) {
        fromEvent(elementRef, 'mouseleave').pipe(
          takeUntil(overlayRef.detachments())
        ).subscribe(() => {
          this.close();
        });

        fromEvent(elementRef, 'mouseenter').pipe(
          takeUntil(overlayRef.detachments())
        ).subscribe(() => {
          this.open();
        });
      }
    });
  }

  open() {
    this._interactionRequest.next('open');
    timer(this.openDelay()).pipe(
      takeUntil(this._interactionRequest)
    ).subscribe(() => {
      this.popupRef.open();
    });
  }

  close() {
    this._interactionRequest.next('close');
    timer(this.closeDelay()).pipe(
      takeUntil(this._interactionRequest)
    ).subscribe(() => {
      this.popupRef.close();
    });
  }

  private _getOverlayPositionStrategy(): FlexibleConnectedPositionStrategy {
    return this._overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withLockedPosition()
      .withGrowAfterOpen()
      .withPositions(getConnectedPosition(this.position(),10));
  }

}
