import {
  AfterContentInit,
  Directive,
  effect,
  HostBinding,
  HostListener,
  inject,
  InjectionToken,
  OnDestroy
} from '@angular/core';
import {LIST_BOX, ListBoxInterface, ListBoxOptionInterface} from "./listbox.injectors";
import {ActiveDescendantKeyManager} from "@angular/cdk/a11y";
import {DOWN_ARROW, ENTER, hasModifierKey, SPACE, UP_ARROW} from "@angular/cdk/keycodes";


export const LIST_KEY_MANAGER_KEYDOWN_HANDLER = new InjectionToken<ListKeyManagerKeydownHandler>(
  'LIST_KEY_MANAGER_KEYDOWN_HANDLER',
);

export interface  ListKeyManagerKeydownHandler {
  _handleKeydown(event: KeyboardEvent)
}

@Directive({
  selector: '[listboxKeydownHandler]',
  standalone: true
})
export class ListboxKeydownHandlerDirective implements  OnDestroy, AfterContentInit {

  protected readonly listBox: ListBoxInterface = inject(LIST_BOX);

  protected _listKeyManager: ActiveDescendantKeyManager<ListBoxOptionInterface>

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
      manager.activeItem.select();
    } else {
      manager.onKeydown(event);

      // // We setValue a duration on the live announcement, because we want the live element to be
      // // cleared after a while so that users can't navigate to it using the arrow keys.
      // this.liveAnnouncer.announce((manager.activeItem as OptionComponent)?.contentElement?.nativeElement?.innerHTML, 10000);
    }

  }

  ngOnDestroy() {
    this._listKeyManager?.destroy();
  }

  private _initKeyManager() {
    this._listKeyManager = new ActiveDescendantKeyManager<ListBoxOptionInterface>(this.listBox.options)
        .withTypeAhead()
        .withVerticalOrientation()
        .withHomeAndEnd()
        .withWrap()
        .withAllowedModifierKeys(['shiftKey']);
  }

  ngAfterContentInit(): void {
     this._initKeyManager()
     this.listBox.activeOptionChange$.subscribe((option)=>{
      if(option && this._listKeyManager.activeItem !==  option) {
        this._listKeyManager.setActiveItem(option)
      }
    })
  }



}
