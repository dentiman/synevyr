import { Directive, ElementRef, inject, Input, TemplateRef } from '@angular/core';
import { CdkSelectDirective } from './select.directive';
import { ComponentType } from '@angular/cdk/overlay';
import { CdkPopupDirective } from '../popup/popup.directive';

@Directive({
  selector: '[cdkSelectTriggerFor]',
  standalone: true,
  host: {
    'aria-haspopup': 'listbox',
    '[aria-expanded]': 'isOpened()',
    '(keydown)': 'onKeydown($event)'
  }
})
export class CdkSelectTriggerForDirective extends CdkPopupDirective {

  selectControl = inject(CdkSelectDirective)
  triggerRef = inject(ElementRef)
  @Input({alias:'cdkSelectTriggerFor'})  componentOrTemplateRef: ComponentType<Element> | TemplateRef<Element>

  constructor() {
    super();
    //TODO:: need unsubscribe
    this.selectControl.optionTriggered.subscribe(()=> {
      if(this.selectControl.multiple === false) {
        this.close()
      }
    })
  }

  onKeydown(event: KeyboardEvent) {
    this.selectControl.listbox.onKeydown(event)
  }

}
