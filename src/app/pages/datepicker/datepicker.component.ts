import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CdkDatepickerInputDirective,
  DatepickerDirective,
  CdkPopupPanelDirective,
  CdkPopupTriggerForDirective,
  CdkPopupOriginDirective, CdkDateRangePickerDirective, CdkStartDateInputDirective, CdkEndDateInputDirective
} from '@synevyr/cdk';
import { SuiCalendarComponent } from '@synevyr/ui';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkDatepickerInputDirective,
    SuiCalendarComponent,
    DatepickerDirective,
    CdkPopupTriggerForDirective,
    CdkPopupPanelDirective,
    CdkPopupOriginDirective,
    CdkDateRangePickerDirective,
    CdkStartDateInputDirective,
    CdkEndDateInputDirective
  ],
  templateUrl: './datepicker.component.html'
})
export class DatepickerPageComponent {
  date = new FormControl<string>('2023-10-12');
  dateEnd = new FormControl<string>('2023-10-17');

}
