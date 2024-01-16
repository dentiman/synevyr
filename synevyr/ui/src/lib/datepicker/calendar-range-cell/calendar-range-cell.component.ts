import { Component, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkCalendarRangeCellDirective, CdkCanDisableDirective } from '@synevyr/cdk';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[suiCalendarRangeCell]',
  standalone: true,
  imports: [CommonModule, CdkCalendarRangeCellDirective],
  hostDirectives: [
    {
      directive: CdkCalendarRangeCellDirective,
      inputs: ['date'],
    },
    CdkCanDisableDirective
  ],
  templateUrl: './calendar-range-cell.component.html',
})
export class SuiCalendarRangeCellComponent {

  calendarRangeCell = inject(CdkCalendarRangeCellDirective)

  get date() {
    return  this.calendarRangeCell.date
  }

  @HostBinding('class')
  get classes(): Record<string, boolean> {
    return {
      'py-2' : true,
      'focus:z-10' : true,
      'mb-1' : true,
      'bg-gray-100 text-gray-400': this.calendarRangeCell.disabled() || false,
      'text-indigo-600': this.calendarRangeCell.isToday(),
      'text-gray-300': !this.calendarRangeCell.isActiveMonth() && !this.calendarRangeCell.disabled(),
      'text-gray-500': ((this.calendarRangeCell.isActiveMonth() &&  !this.calendarRangeCell.disabled()) || this.calendarRangeCell.isInRange()) || false,
      'bg-indigo-600': (this.calendarRangeCell.isSelected() && !this.calendarRangeCell.isInRange() && !this.calendarRangeCell.isStartOfRange() && !this.calendarRangeCell.isEndOfRange()) || false,
      'text-white': (this.calendarRangeCell.isSelected() && !this.calendarRangeCell.isInRange() && !this.calendarRangeCell.isStartOfRange() && !this.calendarRangeCell.isEndOfRange()) || false,
      'rounded-md': (this.calendarRangeCell.isSelected() && !this.calendarRangeCell.isInRange() && !this.calendarRangeCell.isStartOfRange() && !this.calendarRangeCell.isEndOfRange()) || false,
      'rounded-l-md': this.calendarRangeCell.isStartOfRange() || false,
      'rounded-r-md': (this.calendarRangeCell.isEndOfRange() || this.calendarRangeCell.isEndOfHoverRange()) || false,
      'bg-indigo-300': (this.calendarRangeCell.isEndOfRange() || this.calendarRangeCell.isStartOfRange()) ||  false,
      'bg-indigo-200': this.calendarRangeCell.isInRange() || false,
      'bg-gray-200': this.calendarRangeCell.isInHoverRange() || false,
    }
  }

}
