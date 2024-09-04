import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkCalendarCellDirective, CdkCalendarDirective, DateRange} from '@synevyr/cdk';
import { SuiCalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { SuiCalendarRangeCellComponent } from '../calendar-range-cell/calendar-range-cell.component';

@Component({
  selector: 'sui-calendar',
  standalone: true,
  imports: [CommonModule, SuiCalendarCellComponent, SuiCalendarRangeCellComponent, CdkCalendarCellDirective],
  hostDirectives: [
    {
      directive: CdkCalendarDirective,
      inputs: ['value','minDate','maxDate','isRangePicker'],
      outputs: ['valueChange']
    }
  ],
  templateUrl: './calendar.component.html',
})
export class SuiCalendarComponent {
  calendar = inject(CdkCalendarDirective)
}
