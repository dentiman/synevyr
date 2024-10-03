import { Directive, model, Signal, WritableSignal } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const SELECTION_MODEL = new InjectionToken<SelectionModel<any>>('SelectionModel');
export interface SelectionModel<T> {
  select(value: T): void
  isSelected(value: T): boolean
}

@Directive({
  selector: '[cdkSingleSelectionModel]',
  standalone: true,
  providers: [{ provide: SELECTION_MODEL, useExisting: CdkSingleSelectionModelDirective }]
})
export class CdkSingleSelectionModelDirective<T> implements SelectionModel<T> {

  value = model<T>(null,{ alias: 'cdkSingleSelectionModel' })

  select(value: T) {
    this.value.set(value)
  }
  isSelected(value: T): boolean {
    return this.value() === value
  }
}

@Directive({
  selector: '[cdkMultipleSelectionModel]',
  standalone: true,
  providers: [{ provide: SELECTION_MODEL, useExisting: CdkMultipleSelectionModelDirective }]
})
export class CdkMultipleSelectionModelDirective<T> implements SelectionModel<T> {
  value = model<T[]>([],{ alias: 'cdkMultipleSelectionModel' })
  select(value: T) {
    const selected = this.value()
    if (Array.isArray(selected)) {
      //TODO: this works only for primitive values (string | number)
      if (selected.includes(value)) {
        this.value.set(selected.filter(v => v !== value))
      } else {
        this.value.set([...selected, value])
      }
    } else {
      this.value.set([value])
    }
  }
  isSelected(value: T): boolean {
    return this.value().includes(value)
  }
}