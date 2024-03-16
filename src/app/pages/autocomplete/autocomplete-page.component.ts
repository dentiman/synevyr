import { Component, forwardRef, inject, model, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CcSelectControlInterface, CdkAutocompleteInputDirective, CdkPrimitiveValueAccessorDirective,
  CdkPopupPanelDirective,
  CdkSelectListboxDirective,
  CdkSelectOptionDirective, SELECT_CONTROL
} from '@synevyr/cdk';
import { CdkControlStatusDirective } from '@synevyr/cdk';
import { map, Observable, startWith } from 'rxjs';
import { ButtonComponent } from '@synevyr/ui';

@Component({
  selector: 'synevyr-autocomplete-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CdkSelectListboxDirective,
    CdkSelectOptionDirective, CdkControlStatusDirective, ButtonComponent, CdkPopupPanelDirective, CdkAutocompleteInputDirective
  ],
  templateUrl: './autocomplete-page.component.html',

  providers: [
    {
      provide: SELECT_CONTROL,
      useExisting:  forwardRef(() => AutocompletePageComponent )
    }
  ]

})
export class AutocompletePageComponent implements OnInit, CcSelectControlInterface  {

  ctrl = new FormControl('One',{validators: Validators.required})

  value = model(null)
  listbox = viewChild(CdkSelectListboxDirective)
  portal = viewChild(CdkPopupPanelDirective)
  triggerRef = viewChild(CdkAutocompleteInputDirective)
  filteredOptions: Observable<string[]>;

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
