import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkPopupTriggerForDirective,
  CdkSelectDirective,
  CdkSelectListboxDirective,
  CdkSelectOptionDirective, CdkSelectPortalDirective, CdkSelectTriggerDirective
} from '@synevyr/cdk';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {SuiSelectComponent } from '@synevyr/ui';

@Component({
  selector: 'synevyr-select-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CdkSelectOptionDirective, CdkPopupTriggerForDirective, SuiSelectComponent, CdkSelectDirective,
    CdkSelectListboxDirective, CdkSelectPortalDirective, CdkSelectTriggerDirective],
  templateUrl: './select-page.component.html',
})
export class SelectPageComponent {

  ctrl = new FormControl(1)
  multiplectrl = new FormControl([1,4])

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
