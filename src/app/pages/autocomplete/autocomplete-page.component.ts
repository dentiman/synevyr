import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CdkAutocompleteInputDirective,
  CdkSelectControlForDirective,
  CdkSelectListboxDirective,
  CdkSelectOptionDirective
} from '@synevyr/cdk';

@Component({
  selector: 'synevyr-autocomplete-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CdkSelectListboxDirective,
    CdkSelectControlForDirective, CdkSelectOptionDirective, CdkAutocompleteInputDirective
  ],
  templateUrl: './autocomplete-page.component.html',
})
export class AutocompletePageComponent {

  ctrl = new FormControl(1)

  setDisabled() {
    this.ctrl.disable()
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
