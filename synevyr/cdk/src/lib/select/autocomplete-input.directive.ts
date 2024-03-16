import {DestroyRef,
  Directive, effect,
  ElementRef, forwardRef,
  inject,Renderer2,
} from '@angular/core';


import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SELECT_CONTROL } from './select-control-token';


@Directive({
  selector: 'input[cdkAutocompleteInput]',
  standalone: true,
  host: {
    'aria-haspopup': 'listbox',
    '(keydown)': '_handleKeydown($event)',
    // '(click)': 'select.portal()?.open()',
    '[aria-expanded]': 'select.portal().isOpened()',
    'role': 'combobox',
    'aria-controls': 'options',
    '(input)': '_handleInput($event.target.value)',
    '(blur)': 'onTouched()'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CdkAutocompleteInputDirective),
      multi: true
    }
  ]
})
export class CdkAutocompleteInputDirective implements ControlValueAccessor {
  select = inject(SELECT_CONTROL);
  elementRef = inject(ElementRef<HTMLElement>);

  destroyRef = inject(DestroyRef);

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef
  ) {

    effect(() => {
      const value = this.select.value();
      this.onChange(value);
      const normalizedValue = value == null ? '' : value;
      _renderer.setProperty(this.elementRef.nativeElement, 'value', normalizedValue);
    });


    effect(() => {
      if (this.select.listbox()) {
        this.select.listbox().optionTriggered
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(
            () => {
              if (!this.select.listbox().multiple()) {
                this.select.portal()?.close();
              }
            }
          );
      }
    });

  }

  _handleKeydown($event) {
    this.select.listbox()?.onKeydown($event);
  }

  _handleInput(value: any) {
    this.select.value.set(value);
    this.onChange(value);
  }


  onTouched = () => {
  };

  onChange: (value) => void = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }


  setDisabledState(isDisabled: boolean): void {
    this.setProperty('disabled', isDisabled);
  }

  writeValue(value: any): void {
    const normalizedValue = value == null ? '' : value;
    this.setProperty('value', normalizedValue);
    this.select.value.set(value);
  }

  protected setProperty(key: string, value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, key, value);
  }

}
