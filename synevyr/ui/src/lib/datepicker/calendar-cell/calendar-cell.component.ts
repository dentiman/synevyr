import { Component, HostBinding, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkCalendarCellDirective, CdkCanDisableDirective } from '@synevyr/cdk';


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[suiCalendarCell]',
  standalone: true,
  imports: [CommonModule, CdkCalendarCellDirective, CdkCanDisableDirective],
  hostDirectives: [
    {
      directive: CdkCalendarCellDirective,
      inputs: ['date'],
    },
    CdkCanDisableDirective
  ],
  templateUrl: './calendar-cell.component.html',

})
export class SuiCalendarCellComponent {
  cdkCalendarCell = inject(CdkCalendarCellDirective)
  get date() {
    return  this.cdkCalendarCell.date
  }


  @HostBinding('class')
  get classes(): Record<string, boolean> {
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
