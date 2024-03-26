import { Component, computed, effect, input, model, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ClassValue } from 'clsx';
import { twc, TwClassDirective } from '@synevyr/cdk';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'sui-switch,button[suiSwitch]',
  standalone: true,
  imports: [CommonModule, TwClassDirective],
  templateUrl: './sui-switch.component.html',
  host: {
    '[attr.disabled]': 'disabled()',
    '[attr.aria-disabled]': 'disabled()',
    '[class]': '_computed()',
    'role': 'switch',
    '[attr.aria-checked]': 'checked()',
    '[checked]': 'checked()',
    '(click)': 'onClick()',
    '(blur)': '_onTouched()',
    '(keydown.space)': '_onKeydown($event)',
    '(keydown.enter)': '_onKeydown($event)',
    'tabindex': '0'
  }
})
export class SuiSwitchComponent implements ControlValueAccessor {

  isLoading = input(false)

  disabled =  model(false)

  checked = model(false)

  _class = input<ClassValue>('',{alias: 'class'})

  _computed = computed(() => {
    return  twc(this.twClass, this._class());
  });

  onClick() {
    if(!this.disabled()) {
      this.checked.update(value => !value)
    }
  }

  _onKeydown(event: KeyboardEvent) {
    event.preventDefault();
    this.onClick();
  }

  twClass = 'bg-gray-200 aria-checked:bg-indigo-600  aria-disabled:opacity-50  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer aria-disabled:cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'

  constructor(@Optional() @Self() public ngControl?: NgControl) {

    if (ngControl) {
      ngControl.valueAccessor = this;

      effect(() => {
        this.onChange(this.checked());
      });

    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouched = () => {
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: boolean) => void = () => {
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
    this.checked.set(value);
  }

}
