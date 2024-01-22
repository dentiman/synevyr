import {
  AfterContentInit,
  Directive,
  effect,
  HostBinding,
  HostListener,
  inject,
  InjectionToken,
  OnDestroy, signal
} from '@angular/core';
import {LIST_BOX, ListBoxInterface, ListBoxOptionInterface} from "./listbox.injectors";
import {ActiveDescendantKeyManager} from "@angular/cdk/a11y";
import {DOWN_ARROW, ENTER, hasModifierKey, SPACE, UP_ARROW} from "@angular/cdk/keycodes";
import { SelectBoxDirective, SelectOptionDirective } from '@synevyr/cdk';
import { isEqual } from 'lodash';


export const LIST_KEY_MANAGER_KEYDOWN_HANDLER = new InjectionToken<ListKeyManagerKeydownHandler>(
  'LIST_KEY_MANAGER_KEYDOWN_HANDLER',
);

export interface  ListKeyManagerKeydownHandler {
  _handleKeydown(event: KeyboardEvent)
}

@Directive({
  selector: '[cdkSelectBoxKeydownHandler]',
  standalone: true
})
export class SelectBoxKeydownHandlerDirective implements  OnDestroy {

  protected readonly  selectBox = inject(SelectBoxDirective)

  protected _listKeyManager: ActiveDescendantKeyManager<SelectOptionDirective>

  activeOptionIndex = signal(null,{equal: isEqual})

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    const manager = this._listKeyManager;
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    const isTyping = manager.isTyping();

    if (isArrowKey && event.altKey) {
      // Close the select on ALT + arrow key to match the native <select>
      event.preventDefault();
      // Don't do anything in this case if the user is typing,
      // because the typing sequence can include the space key.
    } else if (!isTyping && (keyCode === ENTER || keyCode === SPACE) && manager.activeItem && !hasModifierKey(event)) {
      event.preventDefault();
      manager.activeItem.triggerSelection();
    } else {
      manager.onKeydown(event);

    }

  }

  ngOnDestroy() {
    this._listKeyManager?.destroy();
  }

  private _initKeyManager() {
    this._listKeyManager = new ActiveDescendantKeyManager<ListBoxOptionInterface>(this.selectBox.options)
        .withTypeAhead()
        .withVerticalOrientation()
        .withHomeAndEnd()
        .withWrap()
        .withAllowedModifierKeys(['shiftKey']);
  }





}
