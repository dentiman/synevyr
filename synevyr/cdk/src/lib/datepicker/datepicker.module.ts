import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateAdapter} from "./date-adapter";
import {DatepickerInput} from "./datepicker-input";
import {Datepicker} from "./datepicker";
import {CalendarCell} from "./calendar-cell-directive";
import {Calendar} from "./calendar.directive";



@NgModule({
  declarations: [ ],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    DateAdapter
  ]
})
export class DatepickerModule { }
