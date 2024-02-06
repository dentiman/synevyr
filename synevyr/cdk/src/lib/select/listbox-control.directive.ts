import {
  AfterContentInit,
  booleanAttribute,
  ContentChild,
  Directive,
  ElementRef, EventEmitter,
  Input,
  Optional,
  Output,
  Self,
  signal
} from '@angular/core';
import { isEqual } from 'lodash';

import { ControlValueAccessor, NgControl } from '@angular/forms';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';


@Directive({
  selector: '[cdkListboxControl]',
  exportAs: 'cdkListboxControl',
  standalone: true,
  host: {
    '(blur)': '_onTouched()',
  }
})
export class CdkListboxControlDirective implements ControlValueAccessor {


  @Input({ transform: booleanAttribute, alias: 'cdkListboxMultiple' }) multiple: boolean = false;

  @Input({ transform: booleanAttribute })
  disabled: boolean = false;

  value = signal<string | number | string[] | number[]>(null, { equal: isEqual });

  @Output() optionTriggered = new EventEmitter<void>();


  constructor(@Optional() @Self() public ngControl?: NgControl) {


    if (ngControl) {
      this.ngControl.valueAccessor = this;

      toObservable(this.value)
        .pipe(takeUntilDestroyed())
        .subscribe((value) => {
          this.onChange(value);
        });
    }
  }

  _onTouched = () => {
  };

  onChange: (value) => void = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }


  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value.set(value);
  }

}
