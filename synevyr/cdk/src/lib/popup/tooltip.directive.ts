import { computed, Directive, ElementRef, inject, input } from '@angular/core';
import { DefaultPopupPortalComponent } from './default-popup-portal.component';
import { fromEvent, Subject, takeUntil, timer } from 'rxjs';
import { Overlay } from '@angular/cdk/overlay';
import { getConnectedPosition, OverlayPosition } from './popup-positions';
import { ComponentPortal } from '@angular/cdk/portal';


@Directive({
  selector: '[cdkTooltip]',
  standalone: true,
  host: {
    '(mouseenter)': 'open()',
    '(mouseleave)': 'close()'
  }
})
export class CdkTooltipDirective {
  private  readonly overlay = inject(Overlay);
  position = input<OverlayPosition>('above', { alias: 'tooltipPosition' });
  message = input<string>(null, { alias: 'cdkTooltip' });
  elementRef = inject(ElementRef);


  overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withLockedPosition()
        .withGrowAfterOpen()
        .withPositions(getConnectedPosition(this.position(),10))
  })


  openDelay = input<number>(0);
  closeDelay = input<number>(0);


  private _interactionRequest = new Subject<'open' | 'close'>();

  constructor() {
    this.overlayRef.attachments().subscribe(() => {
      const elementRef = this.overlayRef.overlayElement;
      if (elementRef) {
        fromEvent(elementRef, 'mouseleave').pipe(
          takeUntil(this.overlayRef.detachments())
        ).subscribe(() => {
          this.close();
        });

        fromEvent(elementRef, 'mouseenter').pipe(
          takeUntil(this.overlayRef.detachments())
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
      if(!this.overlayRef.hasAttached()) {
        const componentRef = this.overlayRef.attach(new ComponentPortal(DefaultPopupPortalComponent));
        componentRef.instance.message = this.message;
      }
    });
  }

  close() {
    this._interactionRequest.next('close');
    timer(this.closeDelay()).pipe(
      takeUntil(this._interactionRequest)
    ).subscribe(() => {
      this.overlayRef.detach();
    });
  }
}
