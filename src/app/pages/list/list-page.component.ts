import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkListboxControlDirective,
  CdkSelectListboxDirective,
  CdkSelectOptionDirective
} from '@synevyr/cdk';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';

@Component({
  selector: 'synevyr-list-page',
  standalone: true,
  imports: [CommonModule, CdkSelectOptionDirective, ReactiveFormsModule, CdkListbox, CdkOption,  CdkSelectListboxDirective, CdkListboxControlDirective],
  templateUrl: './list-page.component.html',
})
export class ListPageComponent {

  ctrl = new FormControl(1)
  multipleCtrl = new FormControl([1])

  items = [
    { value: 1, label: 'First' },
    { value: 2, label: 'Second' },
    { value: 3, label: 'Third' },
    { value: 4, label: 'Four' },
    { value: 5, label: 'Five' },
    { value: 6, label: 'Dix' }
  ]

  addItems() {
    this.items = [
      { value: 1, label: 'First' },
      { value: 2, label: 'Second' },
      { value: 3, label: 'Third' },
      { value: 4, label: 'Four' },
      { value: 5, label: 'Five' },
      { value: 6, label: 'Dix' },
      { value: 7, label: 'Seven' },
      { value: 8, label: 'Eight' }
    ]

  }
}
