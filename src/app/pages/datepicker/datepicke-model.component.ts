import {Component, computed, ElementRef, signal, TemplateRef, viewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  CdkDateRangePickerDirective,
  PopupPortalDirective, CdkPopupOriginDirective, CdkPrimitiveValueAccessorDirective, DateRange
} from '@synevyr/cdk';
import {CalendarRangeComponent, SuiCalendarComponent} from '@synevyr/ui';

@Component({
  selector: 'app-datepicker-model',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuiCalendarComponent,
    CdkDateRangePickerDirective,
    PopupPortalDirective,
    CdkPopupOriginDirective,
    CdkPrimitiveValueAccessorDirective,
    FormsModule,
    CalendarRangeComponent
  ],
  template: `
  <div class="border-b border-gray-200 pb-5">
  <h3 class="text-base font-semibold leading-6 text-gray-900">Datepicker Base</h3>
  <p class="mt-2 max-w-4xl text-sm text-gray-500">Single select datepicker</p>
</div>

<div >
  <div
          cdkPopupOrigin
          #popupOrigin="cdkPopupOrigin"
    class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
    <label for="name" class="block text-xs font-medium text-gray-900">Date</label>
    <input
      [(ngModel)]="valueModel"
      (focus)="popupPortal.popupRef.open()"
      type="text" name="name" id="name"
      class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
      placeholder="choose date">
  </div>
  <ng-template cdkPopupPortal #popupPortal="cdkPopupPortal" [popupOriginRef]="popupOrigin" >
    <sui-calendar [(value)]="valueModel"    [maxDate]="dateEnd" ></sui-calendar>
  </ng-template>
</div>

 <div class="border-b border-gray-200 pb-5">
    <h3 class="text-base font-semibold leading-6 text-gray-900">Date Range picker </h3>
  </div>

  `
})
export class DatepickerModelComponent {
  dateEnd = '2024-08-29';

  valueModel = signal<string>('2024-07-02')

}
