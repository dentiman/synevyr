import { Directive, ElementRef, inject } from '@angular/core';
import { CdkSelectDirective } from './select.directive';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[cdkSelectTrigger]',
  standalone: true,
  host: {
    'aria-haspopup': 'listbox',
    '(keydown)': 'select.listbox?.onKeydown($event)',
    '(click)': 'select.toggle()',
    '[aria-expanded]': 'select.isOpened()'
  }
})
export class CdkSelectTriggerDirective  {

  select = inject(CdkSelectDirective)
  elementRef = inject(ElementRef)
  ngControl?: NgControl = inject(NgControl)

}
