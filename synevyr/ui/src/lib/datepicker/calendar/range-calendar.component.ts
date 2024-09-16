import {Component, inject, input, model} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiCalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { SuiCalendarRangeCellComponent } from '../calendar-range-cell/calendar-range-cell.component';
import {SuiCalendarNavigationComponent} from "./calendar-navigation.component";
import {CalendarDateAdapter, DateRangeSelectionModel} from "@synevyr/cdk";

@Component({
  selector: 'sui-calendar-range',
  standalone: true,
  imports: [CommonModule, SuiCalendarCellComponent, SuiCalendarRangeCellComponent, SuiCalendarNavigationComponent],
  template: `
    <sui-calendar-navigation [state]="state">
      @for ( week of state.activeMonth.weeks(); track $index) {
        @for ( date of week; track date+$index) {
          
          <button  suiCalendarCell
                   [date]="date"
                   [selectionModel]="state"
                   [minDate]="minDate()"
                   [maxDate]="maxDate()"
          >
          </button>
        }
      }
    </sui-calendar-navigation>
  `
})
export class SuiRangeCalendarComponent {
  private _dateAdapter = inject(CalendarDateAdapter)
  minDate = input<string|null>(null)
  maxDate = input<string|null>(null)

  startDate = model<string|null>(null)
  endDate = model<string|null>(null)

  state = new DateRangeSelectionModel(this.startDate,this.endDate, this._dateAdapter)
}