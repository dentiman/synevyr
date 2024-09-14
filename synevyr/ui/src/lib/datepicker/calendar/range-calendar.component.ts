import {Component, inject, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDatepickerDirective } from '@synevyr/cdk';
import { SuiCalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { SuiCalendarRangeCellComponent } from '../calendar-range-cell/calendar-range-cell.component';

@Component({
  selector: 'sui-calendar',
  standalone: true,
  imports: [CommonModule, SuiCalendarCellComponent, SuiCalendarRangeCellComponent, CdkDatepickerDirective],
  templateUrl: './range-calendar.component.html',
})
export class SuiRangeCalendarComponent {

  minDate = input<string|null>(null)
  maxDate = input<string|null>(null)



  //try make dateSelectionModel() and  dateRangeSelectionModel()
}