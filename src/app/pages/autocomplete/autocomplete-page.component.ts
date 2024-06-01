import {
  Component, computed, DestroyRef,
  effect,
  ElementRef,
  forwardRef,
  inject,
  model,
  OnInit,
  TemplateRef,
  viewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CdkSelectListboxDirective,
  CdkSelectOptionDirective, popup
} from '@synevyr/cdk';
import { CdkControlStatusDirective } from '@synevyr/cdk';
import { map, Observable, startWith } from 'rxjs';
import { ButtonComponent } from '@synevyr/ui';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'synevyr-autocomplete-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CdkSelectListboxDirective,
    CdkSelectOptionDirective, CdkControlStatusDirective, ButtonComponent,
  ],
  templateUrl: './autocomplete-page.component.html',

})
export class AutocompletePageComponent implements OnInit  {

  ctrl = new FormControl('One',{validators: Validators.required})

  value = model(null)
  listbox = viewChild(CdkSelectListboxDirective)

  autocompletePortal = viewChild<TemplateRef<any>>('autocompletePortal')
  autocompleteInput = viewChild<ElementRef>('autocompleteInput')

  // @ts-ignore
  popupRef = popup(toObservable(computed(()=>{
    return {
      componentOrTemplateRef: this.autocompletePortal(),
      elementRef: this.autocompleteInput(),
      hasOriginElementWidth: true
    }
  })))


  filteredOptions: Observable<string[]>;

  constructor(destroyRef: DestroyRef) {
    effect(() => {

      this.listbox()?.optionTriggered
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe(
          () => {
            this.popupRef.close();
          }
        );

    });
  }

  ngOnInit() {
    this.filteredOptions = this.ctrl.valueChanges.pipe(
      startWith(''),
      map(value => {
        return value ? this._filter(value) : this.items.slice();
      }),
    );
  }


  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();

    return this.items.filter(option => option.toLowerCase().includes(filterValue));
  }

  setValue() {
    this.ctrl.setValue('Two')
  }

  setDisabled() {
    this.ctrl.disable()
    this.ctrl.setErrors({error: 1})
  }
  setErrors() {
    this.ctrl.setErrors({error: 1})
  }
  setEnabled() {
    this.ctrl.enable()
  }


  model = 'One'

  items: string[] = [
    'One',
    'Two',
    'Three',
    'For',
    'Five'
  ]

}
