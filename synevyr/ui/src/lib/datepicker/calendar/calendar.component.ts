import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActiveMonth, CalendarDateAdapter, SingleDateSelectionModel} from '@synevyr/cdk';
import { SuiCalendarCellComponent } from './calendar-cell.component';
import { SuiCalendarRangeCellComponent } from './calendar-range-cell.component';
import {SuiCalendarNavigationComponent} from "./calendar-navigation.component";

@Component({
  selector: 'sui-calendar',
  standalone: true,
  imports: [CommonModule, SuiCalendarCellComponent, SuiCalendarRangeCellComponent, SuiCalendarNavigationComponent],
  template: `
    <sui-calendar-navigation [state]="state">
      @for (week of state.activeMonth.weeks(); track $index) {
        @for (date of week; track date + $index) {
          <button suiCalendarCell
                  [date]="date"
                  [selectionModel]="state"
                  [minDate]="minDate()"
                  [maxDate]="maxDate()"
                  (click)="selectionChange.emit()"
          >
          </button>
        }
      }
    </sui-calendar-navigation>
  `
})
export class SuiCalendarComponent {
  private _dateAdapter = inject(CalendarDateAdapter)
  minDate = input<string|null>(null)
  maxDate = input<string|null>(null)

  value = model<string|null>(null)
  selectionChange = output()

  state = new SingleDateSelectionModel(this.value, this._dateAdapter)


}