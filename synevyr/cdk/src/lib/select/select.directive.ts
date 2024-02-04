import {
  AfterContentInit,
  ContentChild,
  Directive,
  ElementRef, EventEmitter, inject,
  Input,
  Optional,
  Output,
  Self,
  signal
} from '@angular/core';


import { CdkSelectListboxDirective } from './select-listbox.directive';
import { CdkSelectTriggerDirective } from './select-trigger.directive';
import { CdkListboxControlDirective } from './listbox-control.directive';
import PopupRef from '../popup/popup-ref';
import PopupConfig, { POPUP_CONFIG } from '../popup/popup-config';
import { POPUP_SERVICE } from '../popup/popup.service';
import { CdkSelectPortalDirective } from './select-portal.directive';
import { CdkPopupOriginDirective } from '../popup/popup.directive';

let nextSelectId = 0;


@Directive({
  selector: '[cdkSelect]',
  standalone: true,
})
export class CdkSelectDirective  {

  selectControl = inject(CdkListboxControlDirective);
  private _popup = inject(POPUP_SERVICE)

  private popupConfig? = inject(POPUP_CONFIG, {optional: true})

  id = `select-${nextSelectId++}`;

  get multiple() {
    return this.selectControl.multiple
  }

  @ContentChild(CdkSelectListboxDirective) listbox?: CdkSelectListboxDirective

  @ContentChild(CdkSelectPortalDirective) selectPortal!: CdkSelectPortalDirective

  @ContentChild(CdkSelectTriggerDirective) selectTrigger!: CdkSelectTriggerDirective

  @ContentChild(CdkPopupOriginDirective) popupOrigin?: CdkPopupOriginDirective

  popupRef?: PopupRef

  private _opened =  signal<boolean>(false)

  isOpened = this._opened.asReadonly()

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
      popupRole: this.selectPortal?.popupRole ? this.selectPortal.popupRole : 'menu',
      hasTriggerElementWidth: true,
      elementRef: this.popupOrigin?.elementRef || this.selectTrigger?.elementRef,
      maxHeight: this.selectPortal?.cdkPopupMaxHeight ? this.selectPortal?.cdkPopupMaxHeight : '300',
      width: this.selectPortal?.cdkPopupWidth
    }
    config = {...this.popupConfig ?? {}, ...config}
    this.popupRef = this._popup.open(this.selectPortal.templateRef, config)
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
