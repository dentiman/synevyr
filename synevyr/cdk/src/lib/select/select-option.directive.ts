import {
  booleanAttribute,
  computed,
  Directive, effect, ElementRef,
  inject, input,
  Input,
  Signal, untracked
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { CdkSelectListboxDirective } from './select-listbox.directive';
import { SELECTION_MODEL, SelectionModel } from './selection-models';


@Directive({
  selector: '[cdkSelectOption]',
  exportAs: 'cdkSelectOption',
  standalone: true,
  host: {
    'role': 'option',
    '[id]': 'id',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-disabled]': '(_disabled() === true || this.listbox.disabled() === true) || null',
    '[attr.data-active]': 'isActive()',
    '(mouseenter)': 'setActive()',
    '(click)': 'triggerSelection()'
  }
})
export class CdkSelectOptionDirective<T> implements Highlightable {

  readonly listbox = inject(CdkSelectListboxDirective)

  readonly element: HTMLElement = inject(ElementRef).nativeElement;

  selectionModel = inject(SELECTION_MODEL) as SelectionModel<T>;

  id =  this.listbox.id + `-option-${this.listbox.nextSelectOptionId++}`;

  @Input({required: true, alias:'cdkSelectOption'}) value!: T

  _disabled = input(false,{alias: 'disabled'})

  selectedByDefault = input(false, {alias: 'selected'})

  constructor() {
    effect(() => {
      if(this.selectedByDefault()) {
       untracked(() => this.selectionModel.select(this.value))
      }
    });
  }

  get disabled(): boolean {
    return  this._disabled();
  }

  isSelected: Signal<boolean> = computed(()=> {
    return this.selectionModel.isSelected(this.value)
  })

  isActive: Signal<boolean> = computed(() => {
    return this.value === this.listbox.activeOptionValue()
  });


  triggerSelection() {
    if(this.disabled === true) return;
    this.selectionModel.select(this.value)
    this.listbox.optionTriggered.emit()
  }

  setActive() {
    this.listbox.setActiveOption(this)
  }

  getLabel() {
    return this.element.textContent?.trim() || '';
  }

  setActiveStyles(): void {
  }

  setInactiveStyles(): void {
  }

}
