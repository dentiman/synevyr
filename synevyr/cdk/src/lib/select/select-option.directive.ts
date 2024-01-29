import {
  booleanAttribute,
  computed,
  Directive, ElementRef,
  HostListener,
  inject,
  Input, OnDestroy, OnInit,
  Signal
} from '@angular/core';
import { CdkSelectDirective } from './select.directive';
import { Highlightable } from '@angular/cdk/a11y';
import { CdkSelectListboxDirective } from './select-listbox.directive';


@Directive({
  selector: '[cdkSelectOption]',
  exportAs: 'cdkSelectOption',
  standalone: true,
  host: {
    'role': 'option',
    '[id]': 'id',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-disabled]': 'disabled',
    '[attr.data-active]': 'isActive()',
    '(mouseenter)': 'setActive()',
    '(click)': 'triggerSelection()'
  }
})
export class CdkSelectOptionDirective implements Highlightable {

  readonly selectControl = inject(CdkSelectDirective)
  readonly listbox = inject(CdkSelectListboxDirective)

  readonly element: HTMLElement = inject(ElementRef).nativeElement;

  id =  this.selectControl.id + `-option-${this.listbox.nextSelectOptionId++}`;

  @Input({required: true, alias:'cdkSelectOption'}) value!: string | number


  @Input({transform: booleanAttribute})
  get disabled(): boolean {
    return this.selectControl.disabled || this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled: boolean = false;


  isSelected: Signal<boolean> = computed(()=> {
      const selected = this.selectControl.value()

      // @ts-ignore
    if(this.selectControl.multiple && Array.isArray(selected) && selected.includes(this.value)) {
        return true
      } else {
        return  selected === this.value
      }
  })

  isActive: Signal<boolean> = computed(() => {
    return this.value === this.listbox.activeOptionValue()
  });


  triggerSelection() {
    if(this.disabled) return;
    if(this.selectControl.multiple) {
        // @ts-ignore
      this.selectControl.value.update(selectedValues => {
           // @ts-ignore
          if(Array.isArray(selectedValues)  &&  selectedValues.includes(this.value)) {
              return  selectedValues.filter(value => value !== this.value)
           }
           if(Array.isArray(selectedValues)) {
            return  [...selectedValues,this.value]
          }
           return [this.value]
        })
    } else {
       this.selectControl.value.set(this.value)
    }
    this.selectControl.optionTriggered.emit()
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
