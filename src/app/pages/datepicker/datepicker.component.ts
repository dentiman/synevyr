import {Component, computed, ElementRef, signal, TemplateRef, viewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  CdkDatepickerInputDirective,
  DatepickerDirective,
  CdkDateRangePickerDirective,
  CdkStartDateInputDirective,
  CdkEndDateInputDirective,
  popup,
  PopupPortalDirective, CdkPopupOriginDirective, CdkPrimitiveValueAccessorDirective, DateRange
} from '@synevyr/cdk';
import {SuiCalendarComponent} from '@synevyr/ui';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkDatepickerInputDirective,
    SuiCalendarComponent,
    DatepickerDirective,
    CdkDateRangePickerDirective,
    CdkStartDateInputDirective,
    CdkEndDateInputDirective,
    PopupPortalDirective,
    CdkPopupOriginDirective,
    CdkPrimitiveValueAccessorDirective,
    FormsModule
  ],
  templateUrl: './datepicker.component.html'
})
export class DatepickerPageComponent {
  date = new FormControl<string>('2024-07-02');
  dateEnd = '2024-08-29';


  valueModel = signal<string|DateRange>('2024-07-02')

  rangeModel = signal<string|DateRange>({
    'start': '2024-07-10',
    'end':  '2024-07-15'
  })
}
