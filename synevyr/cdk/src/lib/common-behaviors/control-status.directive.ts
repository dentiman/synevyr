import { Directive, Input, Self } from '@angular/core';
import { AbstractControlDirective, NgControl, Validators } from '@angular/forms';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[cdkControlStatus]',
  standalone: true,
  host: {
    '[attr.data-untouched]': 'isUntouched',
    '[attr.data-touched]': 'isTouched',
    '[class.ng-pristine]': 'isPristine',
    '[class.ng-dirty]': 'isDirty',
    '[class.ng-valid]': 'isValid',
    '[attr.aria-invalid]': 'isInvalid',
    '[attr.data-pending]': 'isPending',
    '[attr.aria-disabled]': 'isDisabled',
    '[attr.aria-required]': 'required',
    // for input
    '[disabled]': 'isDisabled',
    '[required]': 'required',
  }
})
export class ControlStatusDirective  {

  private _cd: AbstractControlDirective|null;
  constructor(@Self() cd: NgControl) {
    this._cd = cd;
  }

  protected get isTouched() {
    return !!this._cd?.control?.touched;
  }

  protected get isUntouched() {
    return !!this._cd?.control?.untouched;
  }

  protected get isPristine() {
    return !!this._cd?.control?.pristine;
  }

  protected get isDirty() {
    return !!this._cd?.control?.dirty;
  }

  protected get isValid() {
    return !!this._cd?.control?.valid;
  }

  protected get isInvalid() {
    return !!this._cd?.control?.invalid;
  }

  protected get isPending() {
    return !!this._cd?.control?.pending;
  }
  protected get isDisabled() {
    return !!this._cd?.control?.disabled;
  }


  @Input()
  get required(): boolean {
    return this._required ?? this._cd?.control?.hasValidator(Validators.required) ?? false;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;


}
