import { Directive, effect, ElementRef, inject } from '@angular/core';
import {  SELECT_CONTROL } from './select-control-for.directive';

@Directive({
  selector: '[cdkSelectTrigger]',
  standalone: true,
  host: {

    '(keydown)': 'onKeydown($event)',
    '(click)': 'select.portal()?.toggle()',
    '[aria-expanded]': 'select.portal()?.isOpened()'
  }
})
export class CdkSelectTriggerDirective  {

  select = inject(SELECT_CONTROL)
  elementRef = inject(ElementRef)

  constructor() {

    effect(() => {
      if(this.select.portal()) {
        this.select.portal().triggerRef = this.elementRef
      }
    })

  }
  onKeydown($event) {
  //  console.log(this.select.listbox())
    this.select.listbox()?.onKeydown($event)
  }


}
