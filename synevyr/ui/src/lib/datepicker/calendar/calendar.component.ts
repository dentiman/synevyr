import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkCalendarDirective } from '@synevyr/cdk';
import { SuiCalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { SuiCalendarRangeCellComponent } from '../calendar-range-cell/calendar-range-cell.component';

@Component({
  selector: 'sui-calendar',
  standalone: true,
  imports: [CommonModule, SuiCalendarCellComponent, SuiCalendarRangeCellComponent],
  hostDirectives: [
    {
      directive: CdkCalendarDirective,
      inputs: ['selected','minDate','maxDate'],
      outputs: ['selectedChange']
    }
  ],
  templateUrl: './calendar.component.html',
})
export class SuiCalendarComponent {
  calendar = inject(CdkCalendarDirective)
}
