import {
  booleanAttribute,
  computed,
  Directive,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnInit,
  Signal
} from '@angular/core';
import { SelectBoxDirective } from './select-box.directive';

let nextSelectOptionId = 0;


@Directive({
  selector: '[cdkSelectOption]',
  exportAs: 'cdkSelectOption',
  standalone: true,
  host: {
    'role': 'option',
    '[id]': 'id',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-disabled]': 'disabled',
    '[attr.data-active]': 'isActive()'
  }
})
export class SelectOptionDirective {

  selectBox = inject(SelectBoxDirective)

  @Input() id = `select-option-${nextSelectOptionId++}`;
  @Input({required: true, alias:'cdkSelectOption'}) value!: string | number
  @Input() index?: number;


  @Input({transform: booleanAttribute})
  get disabled(): boolean {
    return this.selectBox.disabled || this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled: boolean = false;


  isSelected: Signal<boolean> = computed(()=> {
      const selected = this.selectBox.value()

      // @ts-ignore
    if(this.selectBox.multiple && Array.isArray(selected) && selected.includes(this.value)) {
        return true
      } else {
        return  selected === this.value
      }
  })

  isActive: Signal<boolean> = computed(() => {
    //todo:: need implement by keydown handler
    return false
  });

  @HostListener('click')
  triggerSelection() {
    if(this.disabled) return;
    if(this.selectBox.multiple) {
        // @ts-ignore
      this.selectBox.value.update(selectedValues => {
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
       this.selectBox.value.set(this.value)
    }
  }
}
