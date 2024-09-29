import {Component, computed, inject, Input, input, model, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateSelectionModel} from '@synevyr/cdk';
import { SuiCalendarCellComponent } from './calendar-cell.component';
import { SuiCalendarRangeCellComponent } from './calendar-range-cell.component';


@Component({
  selector: 'sui-calendar-navigation',
  standalone: true,
  imports: [CommonModule, SuiCalendarCellComponent, SuiCalendarRangeCellComponent],
  template: `
  <div class="max-w-xs flex-none p-1">
  <div class="flex items-center text-center text-gray-900 space-x-2">
    <button type="button" (click)="state.activeMonth.setPreviousYear()"
            class=" flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 py-2 px-2 hover:bg-gray-100 rounded-md">
      <span class="sr-only">Previous month</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
      </svg>
    </button>
    <button type="button" (click)="state.activeMonth.setPreviousMonth()"
            class=" flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 py-2 px-2 hover:bg-gray-100 rounded-md">
      <span class="sr-only">Previous month</span>
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd"/>
      </svg>
    </button>

    <div class="flex-auto text-sm font-semibold py-2 px-2 ">
      {{ state.activeMonth.monthName()  }} {{ state.activeMonth.year() }}
    </div>

    <button type="button" (click)="state.activeMonth.setNextMonth()"
            class=" flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 py-2 px-2 hover:bg-gray-100 rounded-md">
      <span class="sr-only">Next month</span>
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clip-rule="evenodd"/>
      </svg>
    </button>
    <button type="button" (click)="state.activeMonth.setNextYear()"
            class=" flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 py-2 px-2 hover:bg-gray-100 rounded-md">
      <span class="sr-only">Next month</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
  <div class="mt-2 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
    <div>S</div>
    <div>M</div>
    <div>T</div>
    <div>W</div>
    <div>T</div>
    <div>F</div>
    <div>S</div>
  </div>
    <div class="isolate mt-2 grid grid-cols-7  text-sm ">
      <ng-content></ng-content>
    </div>
</div>
  `,
})
export class SuiCalendarNavigationComponent {
  @Input({required: true})
  state!: DateSelectionModel;
}