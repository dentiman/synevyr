import {
  ContentChild,
  Directive, effect,
  ElementRef,
  inject, InjectionToken, Injector,
  Input, Renderer2, Signal,
  signal,
  TemplateRef
} from '@angular/core';
import { CdkPopupDirective, CdkPopupOriginDirective, CdkPopupPanelDirective } from '../popup/popup.directive';

import PopupRef from '../popup/popup-ref';
import PopupConfig, { POPUP_CONFIG, PopupRole } from '../popup/popup-config';
import { CdkSelectListboxDirective } from './select-listbox.directive';
import { CdkSelectTriggerDirective } from './select-trigger.directive';
import { POPUP_SERVICE } from '../popup/popup.service';
import { CdkListboxControlDirective } from './listbox-control.directive';

let nextSelectControlId = 0;


export interface CcSelectControlInterface {

  listbox: Signal<CdkSelectListboxDirective>
  portal: Signal<CdkPopupPanelDirective>
  valueControl: CdkListboxControlDirective

}


export const SELECT_CONTROL = new InjectionToken<CcSelectControlInterface>('SELECT_CONTROL')


@Directive({
  selector: '[cdkSelectPortal]',
  standalone: true
})
export class CdkSelectPortalDirective  extends CdkPopupDirective {
  select = inject(SELECT_CONTROL)

  triggerRef: ElementRef
  componentOrTemplateRef



}



@Directive({
  selector: 'input[cdkAutocompleteInput]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkListboxControlDirective,
    }
  ],
  host: {
    // 'aria-haspopup': 'listbox',
    // '(keydown)': '_handleKeydown($event)',
    // '(click)': 'open()',
    // '[aria-expanded]': 'isOpened()',
    // 'role': 'combobox',
    // 'aria-controls': 'options',
    // '(input)': '_handleInput($event.target.value)'
  },
  providers: [
    {
      provide: SELECT_CONTROL,
      useExisting: CdkAutocompleteInputDirective
    }
  ]
})
export class CdkAutocompleteInputDirective  {
  //
  // @Input({alias:'cdkAutocompleteInput'})  portalTemplateRef: TemplateRef<Element>
  //
  // constructor(_renderer: Renderer2) {
  //   super();
  //   effect(() => {
  //    const   value = this.selectControl.value()
  //     const normalizedValue = value == null ? '' : value;
  //     _renderer.setProperty(this.elementRef.nativeElement,'value',normalizedValue)
  //   });
  // }
  //
  // _handleKeydown($event) {
  //   this.listbox?.onKeydown($event)
  // }
  //
  // _handleInput(value: any) {
  //     this.selectControl.value.set(value)
  // }

}
