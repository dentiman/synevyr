import { Directive, ElementRef, inject, Input, TemplateRef } from '@angular/core';
import { CdkSelectDirective } from './select.directive';
import { ComponentType } from '@angular/cdk/overlay';
import { CdkPopupDirective } from '../popup/popup.directive';

@Directive({
  selector: '[cdkSelectTrigger]',
  standalone: true,
  host: {
    'aria-haspopup': 'listbox',
    '(keydown)': 'onKeydown($event)'
  }
})
export class CdkSelectTriggerDirective  {

  selectControl = inject(CdkSelectDirective)
  triggerRef = inject(ElementRef)

  onKeydown(event: KeyboardEvent) {
    this.selectControl.listbox.onKeydown(event)
  }

}
