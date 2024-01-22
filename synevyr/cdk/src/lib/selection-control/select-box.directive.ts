import {
  booleanAttribute,
  ContentChildren,
  Directive,
  effect,
  HostListener,
  Input,
  Optional, QueryList,
  Self,
  signal
} from '@angular/core';
import { isEqual } from 'lodash';

import { ControlValueAccessor, NgControl } from '@angular/forms';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { SelectOptionDirective } from './select-option.directive';

let nextSelectBoxId = 0;

@Directive({
  selector: '[cdkSelectBox]',
  standalone: true,
  host: {
    'role': 'listbox',
    '[attr.tabindex]': '1',
    '[id]': 'id',
    'attr.aria-orientation': 'vertical',
    '[attr.aria-multiselectable]': "multiple"
  },
})
export class SelectBoxDirective implements  ControlValueAccessor {

  @Input() id = `select-box-${nextSelectBoxId++}`;
  @Input({transform: booleanAttribute, alias: 'cdkSelectBoxMultiple'}) multiple: boolean = false

  @Input({transform: booleanAttribute})
  disabled: boolean = false;

  @ContentChildren(SelectOptionDirective, {descendants: true,}) options: QueryList<SelectOptionDirective> = new QueryList<SelectOptionDirective>()

  value = signal<string|number|string[]|number[]>(null,{equal: isEqual})

  constructor(@Optional() @Self() public ngControl?: NgControl) {

    if(ngControl) {
      this.ngControl.valueAccessor = this
      toObservable(this.value)
        .pipe(takeUntilDestroyed())
        .subscribe((value)=> {
          this.onChange(value)
        })
    }
  }

  private _onTouched = () => {};

  onChange: (value) => void = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }


  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  writeValue(value: any): void {
    this.value.set(value)
  }

}
