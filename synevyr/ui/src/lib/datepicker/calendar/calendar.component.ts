import {Component, inject, input, model} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActiveMonth, CalendarDateAdapter, CdkDatepickerDirective} from '@synevyr/cdk';
import { SuiCalendarCellComponent } from '../calendar-cell/calendar-cell.component';
import { SuiCalendarRangeCellComponent } from '../calendar-range-cell/calendar-range-cell.component';
import {takeUntilDestroyed, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {filter, map, pairwise} from "rxjs";

@Component({
  selector: 'sui-calendar',
  standalone: true,
  imports: [CommonModule, SuiCalendarCellComponent, SuiCalendarRangeCellComponent, CdkDatepickerDirective],
  templateUrl: './calendar.component.html',
})
export class SuiCalendarComponent {
  private _dateAdapter = inject(CalendarDateAdapter)
  minDate = input<string|null>(null)
  maxDate = input<string|null>(null)
  value = model<string|null>(null)

  selectedDate = toSignal(toObservable(this.value).pipe(
          takeUntilDestroyed(),
          pairwise(),
          filter(([prev,current]) => {
            if(current === null && prev !== null) { return true }
            if( typeof current ===  'string' && !this._dateAdapter.isValidDate(current)) { return false }
            return !(typeof current === 'string' && typeof prev === 'string' && this._dateAdapter.isEqualTo(current, prev));
          }),
          map(([prev,current]) => current)
      ))


  selectDate(date: string | null) {
    this.value.set(date)
  }

  activeMonth = new ActiveMonth(this.value , this._dateAdapter)
}