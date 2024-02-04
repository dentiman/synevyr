import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { CdkSelectDirective } from './select.directive';

@Directive({
  selector: 'input[cdkAutocompleteInput]',
  standalone: true,
  host: {
    'aria-haspopup': 'listbox',
    '(keydown)': 'select.listbox?.onKeydown($event)',
    '(focus)': 'select.open()',
    '[aria-expanded]': 'select.isOpened()',
    'role': 'combobox',
    'aria-controls': 'options',
  }
})
export class CdkAutocompleteInputDirective {

  select = inject(CdkSelectDirective);
  elementRef = inject(ElementRef);

}
