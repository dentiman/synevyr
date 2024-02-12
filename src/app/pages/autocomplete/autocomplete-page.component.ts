import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CdkAutocompleteInputDirective,
  CdkSelectControlForDirective,
  CdkSelectListboxDirective,
  CdkSelectOptionDirective
} from '@synevyr/cdk';
import { CdkControlStatusDirective } from '@synevyr/cdk';
import { map, Observable, startWith } from 'rxjs';
import { ButtonComponent } from '@synevyr/ui';

@Component({
  selector: 'synevyr-autocomplete-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CdkSelectListboxDirective,
    CdkSelectControlForDirective, CdkSelectOptionDirective, CdkAutocompleteInputDirective, CdkControlStatusDirective, ButtonComponent
  ],
  templateUrl: './autocomplete-page.component.html',

})
export class AutocompletePageComponent implements OnInit {

  ctrl = new FormControl('On',{validators: Validators.required})

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
