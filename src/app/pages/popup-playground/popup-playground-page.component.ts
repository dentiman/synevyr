import { Component, computed,  ElementRef, inject, signal,  TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@synevyr/ui';
import { CdkTooltipDirective, popup } from '@synevyr/cdk';
import {  Overlay } from '@angular/cdk/overlay';


@Component({
  selector: 'synevyr-popup-playground-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, CdkTooltipDirective],
  templateUrl: './popup-playground-page.component.html',
})
export class PopupPlaygroundPageComponent {

  private _overlay = inject(Overlay);


  popupOrigin = viewChild('popupOrigin',{read: ElementRef })

  popupPortal = viewChild<TemplateRef<any>>('popupPortal')

  popupRef = popup(computed<any>(() => {
    return {
      componentOrTemplateRef: this.popupPortal(),
      elementRef: this.popupOrigin(),
      positionStrategy: this.getOverlayPositionStrategy()
    };
  }));

  open() {
    this.popupRef.open()
  }


  originX = signal<any>('start')
  originY =signal<any>('top')
  overlayX = signal<any>('start')
  overlayY = signal<any>('top')



  x = ['start' , 'center' ,'end']
  y = ['top' , 'center' ,'bottom']

  getOverlayPositionStrategy = computed(() => {

    return this._overlay
      .position()
      .flexibleConnectedTo(this.popupOrigin())
      .withLockedPosition()
      .withGrowAfterOpen()
      .withPositions([
        { originX: this.originX(),
          originY: this.originY(),
          overlayX: this.overlayX(),
          overlayY: this.overlayY()
        },
      ]);
  })

}
