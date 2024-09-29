import { Component, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CdkCalendarCellDirective, CdkCalendarRangeCellDirective} from '@synevyr/cdk';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[suiCalendarRangeCell]',
  standalone: true,
  imports: [CommonModule, CdkCalendarRangeCellDirective],
  hostDirectives: [
    {
      directive: CdkCalendarCellDirective,
      inputs: ['date','minDate','maxDate','selectionModel'],
    },
    {
      directive: CdkCalendarRangeCellDirective,
      inputs: ['date','selectionModel'],
    }
  ],
  template: `<div class="mx-auto flex h-5 w-5 items-center justify-center rounded-full ">{{ dayLabel }}</div>`,
})
export class SuiCalendarRangeCellComponent {

  calendarCell = inject(CdkCalendarCellDirective)
  calendarRangeCell = inject(CdkCalendarRangeCellDirective)

  get dayLabel() {
    return  this.calendarCell.day
  }


  @HostBinding('class')
  get classes(): Record<string, boolean> {
    return {
      'py-2' : true,
      'focus:z-10' : true,
      'mb-1' : true,
      'bg-gray-100 text-gray-400': this.calendarCell.disabled() || false,
      'text-indigo-600': this.calendarCell.isToday(),
      'text-gray-300': !this.calendarCell.isActiveMonth() && !this.calendarCell.disabled(),
      'text-gray-500': ((this.calendarCell.isActiveMonth() &&  !this.calendarCell.disabled()) || this.calendarRangeCell.isInRange()) || false,
      'bg-indigo-600': (this.calendarCell.isSelected() && !this.calendarRangeCell.isInRange() && !this.calendarRangeCell.isStartOfRange() && !this.calendarRangeCell.isEndOfRange()) || false,
      'text-white': (this.calendarCell.isSelected() && !this.calendarRangeCell.isInRange() && !this.calendarRangeCell.isStartOfRange() && !this.calendarRangeCell.isEndOfRange()) || false,
      'rounded-md': (this.calendarCell.isSelected() && !this.calendarRangeCell.isInRange() && !this.calendarRangeCell.isStartOfRange() && !this.calendarRangeCell.isEndOfRange()) || false,
      'rounded-l-md': this.calendarRangeCell.isStartOfRange() || false,
      'rounded-r-md': (this.calendarRangeCell.isEndOfRange() || this.calendarRangeCell.isEndOfHoverRange()) || false,
      'bg-indigo-300': (this.calendarRangeCell.isEndOfRange() || this.calendarRangeCell.isStartOfRange()) ||  false,
      'bg-indigo-200': this.calendarRangeCell.isInRange() || false,
      'bg-gray-200': this.calendarRangeCell.isInHoverRange() || false,
    }
  }

}
