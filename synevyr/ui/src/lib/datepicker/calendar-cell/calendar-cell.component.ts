import {Component, HostBinding, inject, input, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkCalendarCellDirective} from '@synevyr/cdk';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[suiCalendarCell]',
  standalone: true,
  imports: [CommonModule, CdkCalendarCellDirective],
  hostDirectives: [
    {
      directive: CdkCalendarCellDirective,
      inputs: ['date','minDate','maxDate','selectionModel'],
    }
  ],
  templateUrl: './calendar-cell.component.html',

})
export class SuiCalendarCellComponent {
  cdkCalendarCell = inject(CdkCalendarCellDirective)
  get dayLabel() {
    return  this.cdkCalendarCell.day
  }

  @HostBinding('class')
  get classes(): Record<string, boolean> {
    // if(this.cdkCalendarCell.calendar.isRangePicker()) {
    //   return {
    //     'py-2' : true,
    //     'focus:z-10' : true,
    //     'mb-1' : true,
    //     'bg-gray-100 text-gray-400': this.cdkCalendarCell.disabled() || false,
    //     'text-indigo-600': this.cdkCalendarCell.isToday(),
    //     'text-gray-300': !this.cdkCalendarCell.isActiveMonth() && !this.cdkCalendarCell.disabled(),
    //     'text-gray-500': ((this.cdkCalendarCell.isActiveMonth() &&  !this.cdkCalendarCell.disabled()) || this.cdkCalendarCell.isInRange()) || false,
    //     'bg-indigo-600': (this.cdkCalendarCell.isSelected() && !this.cdkCalendarCell.isInRange() && !this.cdkCalendarCell.isStartOfRange() && !this.cdkCalendarCell.isEndOfRange()) || false,
    //     'text-white': (this.cdkCalendarCell.isSelected() && !this.cdkCalendarCell.isInRange() && !this.cdkCalendarCell.isStartOfRange() && !this.cdkCalendarCell.isEndOfRange()) || false,
    //     'rounded-md': (this.cdkCalendarCell.isSelected() && !this.cdkCalendarCell.isInRange() && !this.cdkCalendarCell.isStartOfRange() && !this.cdkCalendarCell.isEndOfRange()) || false,
    //     'rounded-l-md': this.cdkCalendarCell.isStartOfRange() || false,
    //     'rounded-r-md': (this.cdkCalendarCell.isEndOfRange() || this.cdkCalendarCell.isEndOfHoverRange()) || false,
    //     'bg-indigo-300': (this.cdkCalendarCell.isEndOfRange() || this.cdkCalendarCell.isStartOfRange()) ||  false,
    //     'bg-indigo-200': this.cdkCalendarCell.isInRange() || false,
    //     'bg-gray-200': this.cdkCalendarCell.isInHoverRange() || false,
    //   }
    // }
    
    return  {
      'py-2' : true,
      'focus:z-10' : true,
      'mb-1' : true,
      'bg-gray-100': this.cdkCalendarCell.disabled() || false,
      'text-gray-400': this.cdkCalendarCell.disabled() || false,
      'text-indigo-600': this.cdkCalendarCell.isToday(),
      'text-gray-300': !this.cdkCalendarCell.isActiveMonth() && !this.cdkCalendarCell.disabled(),
      'text-gray-500': (this.cdkCalendarCell.isActiveMonth() && !this.cdkCalendarCell.isSelected() &&  !this.cdkCalendarCell.disabled()),
      'bg-indigo-600': this.cdkCalendarCell.isSelected() || false,
      'text-white': this.cdkCalendarCell.isSelected() || false,
      'rounded-md': this.cdkCalendarCell.isSelected() || false
    }
  }

}
