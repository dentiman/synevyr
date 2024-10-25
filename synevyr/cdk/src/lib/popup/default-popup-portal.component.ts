import { Component, inject, input, model, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupRef } from './popup-ref';


@Component({
  selector: 'synevyr-default-popup-portal',
  standalone: true,
  imports: [CommonModule],
  template: `{{message()}}`,
})
export class DefaultPopupPortalComponent {

  message = input<string>('');
}
