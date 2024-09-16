import {Component, computed, ElementRef, signal, TemplateRef, viewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  PopupPortalDirective, CdkPopupOriginDirective, CdkPrimitiveValueAccessorDirective
} from '@synevyr/cdk';
import {SuiCalendarComponent} from '@synevyr/ui';
import {DatepickerModelComponent} from "./datepicke-model.component";
import {DatepickerFormControlComponent} from "./datepicker-form-control.component";

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SuiCalendarComponent,
    PopupPortalDirective,
    CdkPopupOriginDirective,
    CdkPrimitiveValueAccessorDirective,
    FormsModule,
    DatepickerModelComponent,
    DatepickerFormControlComponent
  ],
  template: `
   <app-datepicker-model></app-datepicker-model>
   <app-datepicker-form-control></app-datepicker-form-control>
    `
})
export class DatepickerPageComponent {
  date = new FormControl<string>('2024-07-02');
  dateEnd = '2024-08-29';


  valueModel = signal<string>('2024-07-02')

    protected readonly console = console;
}
