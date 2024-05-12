import { Component, inject, model, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupRef } from './popup-ref';

type DefaultPortalData = {
  message: Signal<string>;
}

@Component({
  selector: 'synevyr-default-popup-portal',
  standalone: true,
  imports: [CommonModule],
  template: `{{message()}}`,
})
export class DefaultPopupPortalComponent {
  popupRef = inject(PopupRef);
  // @ts-ignore
  message = this.popupRef.config.data.message;
}
