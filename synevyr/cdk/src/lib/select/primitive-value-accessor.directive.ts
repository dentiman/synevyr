import {
  Directive, effect,
  model,
  Optional,
  Self
} from '@angular/core';

import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive({
  selector: '[cdkPrimitiveControl]',
  exportAs: 'cdkPrimitiveControl',
  standalone: true,
  host: {
    '(blur)': '_onTouched()'
  }
})
export class CdkPrimitiveValueAccessorDirective implements ControlValueAccessor {

  disabled = model(false);

  value = model(null);

  constructor(@Optional() @Self() public ngControl?: NgControl) {

    if (ngControl) {
      this.ngControl.valueAccessor = this;

      effect(() => {
        this.onChange(this.value());
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
    this.disabled.set(isDisabled);
  }

  writeValue(value: any): void {
    this.value.set(value);
  }

}
