import { Directive, ElementRef, inject } from '@angular/core';
import { CdkSelectControlForDirective } from './select-control-for.directive';

@Directive({
  selector: '[cdkSelectTrigger]',
  standalone: true,
  host: {

    '(keydown)': 'select.listbox?.onKeydown($event)',
    '(click)': 'select.toggle()',
    '[aria-expanded]': 'select.isOpened()'
  }
})
export class CdkSelectTriggerDirective  {

  select = inject(CdkSelectControlForDirective)
  elementRef = inject(ElementRef)

}
