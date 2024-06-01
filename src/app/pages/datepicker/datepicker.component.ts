import { Component, computed, ElementRef, TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  CdkDatepickerInputDirective,
  DatepickerDirective, CdkDateRangePickerDirective, CdkStartDateInputDirective, CdkEndDateInputDirective, popup
} from '@synevyr/cdk';
import { SuiCalendarComponent } from '@synevyr/ui';
import { toObservable } from '@angular/core/rxjs-interop';

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
    CdkEndDateInputDirective
  ],
  templateUrl: './datepicker.component.html'
})
export class DatepickerPageComponent {
  date = new FormControl<string>('2023-10-12');
  dateEnd = new FormControl<string>('2023-10-17');
  popupOriginRef = viewChild<ElementRef>('popupOrigin')
  popupPortalRef = viewChild<TemplateRef<any>>('popupPortal')

  popupRef = popup(toObservable(computed(()=>{
    return {
      componentOrTemplateRef: this.popupPortalRef(),
      elementRef: this.popupOriginRef()
    }
  })))

}
