import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkControlStatusDirective,
  CdkSelectListboxDirective,
  CdkSelectOptionDirective,TwClassDirective
} from '@synevyr/cdk';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { SelectDisplayValueDirective } from '@synevyr/cdk';
import { ButtonComponent, MultipleSelectControlComponent, SuiSelectControlComponent } from '@synevyr/ui';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CdkSelectOptionDirective,
    CdkSelectListboxDirective, SelectDisplayValueDirective,
    ButtonComponent, CdkControlStatusDirective, TwClassDirective, SuiSelectControlComponent, MultipleSelectControlComponent],
  templateUrl: './select-multiple-page.component.html',
})
export class SelectMultiplePageComponent {

  value = signal([1])
  ctrl = new FormControl([1,2,3,4,5])

  setDisabled() {
    this.ctrl.disable()
  }
  setEnabled() {
    this.ctrl.enable()
  }

  setValue() {
    this.ctrl.setValue([4])
  }

  items: any = [
    { value: 1, label: 'First' },
    { value: 2, label: 'Second' },
    { value: 3, label: 'Third' },
    { value: 4, label: 'Four' },
    { value: 5, label: 'Five' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' }
  ]

}
