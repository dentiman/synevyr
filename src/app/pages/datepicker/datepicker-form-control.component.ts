import {Component, computed, ElementRef, signal, TemplateRef, viewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  PopupPortalDirective, CdkPopupOriginDirective, CdkPrimitiveValueAccessorDirective
} from '@synevyr/cdk';
import { SuiCalendarComponent} from '@synevyr/ui';

@Component({
  selector: 'app-datepicker-form-control',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuiCalendarComponent,
    PopupPortalDirective,
    CdkPopupOriginDirective,
    CdkPrimitiveValueAccessorDirective,
    FormsModule
  ],
  template: `
    <div class="border-b border-gray-200 pb-5">
      <h3 class="text-base font-semibold leading-6 text-gray-900">Datepicker Base</h3>
      <p class="mt-2 max-w-4xl text-sm text-gray-500">Single select datepicker</p>
    </div>

    <div>
      <div
          cdkPopupOrigin
          #popupOrigin="cdkPopupOrigin"
          class="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
        <label for="name2" class="block text-xs font-medium text-gray-900">Date</label>
        <input
            [formControl]="date"
            (focus)="popupPortal.popupRef.open()"
            type="text" name="name2" id="name"
            class="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="choose date">
      </div>
      <ng-template cdkPopupPortal #popupPortal="cdkPopupPortal" [popupOriginRef]="popupOrigin" >
        <sui-calendar [value]="date.value" (valueChange)="date.setValue($event)"  (selectionChange)="popupPortal.popupRef?.close()"   ></sui-calendar>
      </ng-template>
    </div>


  `
})
export class DatepickerFormControlComponent {
  date = new FormControl<string>('2024-07-02');

  valueModel = signal<string>('2024-07-02')


  protected readonly signal = signal;
}
