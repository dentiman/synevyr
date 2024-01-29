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
import { CdkSelectListboxDirective } from './select-listbox.directive';
import { CdkSelectTriggerDirective } from './select-trigger.directive';
import { CdkSelectPortalDirective } from './select-portal.directive';


let nextSelectId = 0;


@Directive({
  selector: '[cdkSelect]',
  standalone: true
})
export class CdkSelectDirective implements ControlValueAccessor, AfterContentInit {

  @Input() id = `select-${nextSelectId++}`;
  @Input({ transform: booleanAttribute, alias: 'cdkSelectMultiple' }) multiple: boolean = false;

  @Input({ transform: booleanAttribute })
  disabled: boolean = false;

  value = signal<string | number | string[] | number[]>(null, { equal: isEqual });

  @Output() optionTriggered = new EventEmitter<void>();

  listbox?: CdkSelectListboxDirective

 @ContentChild(CdkSelectTriggerDirective,{read: ElementRef})  triggerRef?: ElementRef


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

  private _onTouched = () => {
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

  ngAfterContentInit(): void {

  }



}
