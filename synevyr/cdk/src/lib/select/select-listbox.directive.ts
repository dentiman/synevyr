import {
  AfterContentInit, computed,
  ContentChildren, DestroyRef,
  Directive, ElementRef, EventEmitter, inject, input,  OnDestroy,  Output, QueryList, signal
} from '@angular/core';

import { CdkSelectOptionDirective } from './select-option.directive';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, hasModifierKey, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkPrimitiveValueAccessorDirective } from './primitive-value-accessor.directive';

let nextListboxId = 0;


@Directive({
  selector: '[cdkSelectListbox]',
  exportAs: 'cdkSelectListbox',
  standalone: true
})
export class CdkSelectListboxDirective<T> extends CdkPrimitiveValueAccessorDirective<T> implements OnDestroy, AfterContentInit {

  destroyRef = inject(DestroyRef);

  elementRef = inject(ElementRef)

  nextSelectOptionId = 0

  multiple = input(false, {alias: 'cdkListboxMultiple'});

  @Output() optionTriggered = new EventEmitter<void>();

  @ContentChildren(CdkSelectOptionDirective, { descendants: true }) options = new QueryList<CdkSelectOptionDirective>();

  id = `listbox-${nextListboxId++}`;

  protected _listKeyManager: ActiveDescendantKeyManager<CdkSelectOptionDirective>;


  protected _activeOption = signal<CdkSelectOptionDirective>(null);

  activeOptionValue = computed(() => {
    return this._activeOption()?.value;
  });




  setActiveOption(option: CdkSelectOptionDirective) {
    this._activeOption.set(option);
    this._listKeyManager?.setActiveItem(option);
  }

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



  ngAfterContentInit(): void {


    this._listKeyManager = new ActiveDescendantKeyManager(this.options)
      .withTypeAhead()
      .withVerticalOrientation()
      .withHomeAndEnd()
      .withWrap()
      .withAllowedModifierKeys(['shiftKey']);


    this._listKeyManager.change
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {

        if (this._listKeyManager.activeItem === null && this.activeOptionValue() !== null) {
          this._activeOption.set(null);
        } else if (this._listKeyManager.activeItem.value !== this.activeOptionValue()) {
          this._activeOption.set(this._listKeyManager.activeItem);
        }
      });

  }

  ngOnDestroy() {
    this._listKeyManager?.destroy();
  }

}
