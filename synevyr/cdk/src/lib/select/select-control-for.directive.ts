import {
  ContentChild,
  Directive, effect,
  ElementRef,
  inject, InjectionToken, Injector,
  Input, Renderer2,
  signal,
  TemplateRef
} from '@angular/core';
import { CdkPopupOriginDirective } from '../popup/popup.directive';

import PopupRef from '../popup/popup-ref';
import PopupConfig, { POPUP_CONFIG } from '../popup/popup-config';
import { CdkSelectListboxDirective } from './select-listbox.directive';
import { CdkSelectTriggerDirective } from './select-trigger.directive';
import { POPUP_SERVICE } from '../popup/popup.service';
import { CdkListboxControlDirective } from './listbox-control.directive';

let nextSelectControlId = 0;


export const SELECT_CONTROL = new InjectionToken<CdkAbstractSelectControlForDirective>('CdkAbstractSelectControlForDirective')

@Directive()
export abstract class CdkAbstractSelectControlForDirective {

  abstract portalTemplateRef: TemplateRef<Element>


  private _popup = inject(POPUP_SERVICE)

  private popupConfig? = inject(POPUP_CONFIG, {optional: true})

  id = `select-${nextSelectControlId++}`;

  listbox?: CdkSelectListboxDirective


  @ContentChild(CdkSelectTriggerDirective) selectTrigger?: CdkSelectTriggerDirective

  @ContentChild(CdkPopupOriginDirective) popupOrigin?: CdkPopupOriginDirective

  elementRef = inject(ElementRef)

  popupRef?: PopupRef

  private _opened =  signal<boolean>(false)

  isOpened = this._opened.asReadonly()

  injector = inject(Injector)

  selectControl = inject(CdkListboxControlDirective);

  constructor() {
    this.selectControl.optionTriggered.subscribe(()=> {
      if(this.selectControl.multiple === false) {
        this.close()
      }
    })
  }

  open() {
    let config: PopupConfig = {
      //TODO: make id to be required
      id: this.id,
      popupRole:  'menu',
      hasTriggerElementWidth: true,
      elementRef: this.popupOrigin?.elementRef || this.elementRef,
      maxHeight:  '300',
      injector: this.injector
    }
    config = {...this.popupConfig ?? {}, ...config}
    this.popupRef = this._popup.open(this.portalTemplateRef, config)
    this._opened.set(true)
  }

  close() {
    this.popupRef?.close()
    this._opened.set(false)
  }

  toggle() {
    const opened = this.popupRef?.overlayRef.hasAttached()
    if (opened) {
      this.close();
    } else {
      this.open()
    }
  }


}



@Directive({
  selector: '[cdkSelectControlFor]',
  standalone: true,
  hostDirectives: [
    {
      directive: CdkListboxControlDirective,
      inputs: ['cdkListboxMultiple: multipleSelect']
    }
  ],
  host: {
    '(click)': 'toggle()',
    '(keydown)': 'listbox?.onKeydown($event)',
    '[aria-expanded]': 'isOpened()',
    'aria-haspopup': 'listbox',
  },
  providers: [
    {
      provide: SELECT_CONTROL,
      useExisting: CdkSelectControlForDirective
    }
  ]
})
export class CdkSelectControlForDirective extends CdkAbstractSelectControlForDirective {
  @Input({alias:'cdkSelectControlFor'})  portalTemplateRef: TemplateRef<Element>
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
    'aria-haspopup': 'listbox',
    '(keydown)': '_handleKeydown($event)',
    '(click)': 'open()',
    '[aria-expanded]': 'isOpened()',
    'role': 'combobox',
    'aria-controls': 'options',
    '(input)': '_handleInput($event.target.value)'
  },
  providers: [
    {
      provide: SELECT_CONTROL,
      useExisting: CdkAutocompleteInputDirective
    }
  ]
})
export class CdkAutocompleteInputDirective extends  CdkAbstractSelectControlForDirective {

  @Input({alias:'cdkAutocompleteInput'})  portalTemplateRef: TemplateRef<Element>

  constructor(_renderer: Renderer2) {
    super();
    effect(() => {
     const   value = this.selectControl.value()
      const normalizedValue = value == null ? '' : value;
      _renderer.setProperty(this.elementRef.nativeElement,'value',normalizedValue)
    });
  }

  _handleKeydown($event) {
    this.listbox?.onKeydown($event)
  }

  _handleInput(value: any) {
      this.selectControl.value.set(value)
  }

}
