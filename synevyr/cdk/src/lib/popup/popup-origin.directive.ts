import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[cdkPopupOrigin]',
  exportAs: 'cdkPopupOrigin',
  standalone: true,
})
export class CdkPopupOriginDirective {
  constructor(
    public elementRef: ElementRef,
  ) {
  }
}
