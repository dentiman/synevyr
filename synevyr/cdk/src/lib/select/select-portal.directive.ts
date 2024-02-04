import { Directive, inject, Input, TemplateRef } from '@angular/core';
import { CdkSelectDirective } from './select.directive';
import { PopupRole } from '../popup/popup-config';

@Directive({
  selector: '[cdkSelectPortal]',
  standalone: true,
})
export class CdkSelectPortalDirective {
  select = inject(CdkSelectDirective)
  templateRef = inject(TemplateRef)

  @Input() popupRole?: PopupRole = 'menu'
  @Input() cdkPopupMaxHeight?: string | number
  @Input() cdkPopupMaxWidth?: string
  @Input() cdkPopupWidth?: string
  @Input() addPopupClass?: string[]


}
