import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateAdapter} from "./date-adapter";


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
