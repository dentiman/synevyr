import { Directive } from '@angular/core';

@Directive({
  selector: '[cdkTab]',
  exportAs: 'cdkTab',
  standalone: true,
})
export class TabDirective {
  constructor() {}
}
