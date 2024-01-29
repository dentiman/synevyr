import { Directive, ElementRef, inject, Input, TemplateRef } from '@angular/core';
import { CdkPopupDirective } from '../popup/popup.directive';
import { CdkSelectDirective } from './select.directive';

@Directive({
  selector: '[cdkSelectPortal]',
  standalone: true,
})
export class CdkSelectPortalDirective extends CdkPopupDirective {
  @Input() triggerRef: ElementRef
  componentOrTemplateRef = inject(TemplateRef)
  selectControl = inject(CdkSelectDirective)
  constructor() {
    super();
    //TODO:: need unsubscribe
    this.selectControl.optionTriggered.subscribe(()=> {
      if(this.selectControl.multiple === false) {
        this.close()
      }
    })
  }

}
