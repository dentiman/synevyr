import {computed, Directive, inject, input, Input} from '@angular/core';
import { CdkDatepickerDirective } from './datepicker.directive';
import { DialogRef } from '@angular/cdk/dialog';
import {toSignal} from "@angular/core/rxjs-interop";
import {CalendarDateAdapter} from "./calendar-date-adapter";
import {ActiveMonth} from "./active-date.state";

@Directive({
    selector: '[cdkCalendarRangeCell]',
    exportAs: 'cdkCalendarRangeCell',
    standalone: true,
    host: {
        // '(mouseenter)': '_handleMouseenter()',
        // '(mouseleave)': '_handleMouseleave()',
        // '(click)': 'setBySelection()',
        '[attr.disabled]': 'disabled() || null',
        '[attr.data-disabled]': 'disabled() || null',
        '[attr.data-today]': 'isToday()',
        '[attr.data-active-month]': 'isActiveMonth()',
        '[attr.data-selected]': 'isSelected()',
        '[attr.aria-selected]': 'isSelected()',
        '[attr.type]': '"button"'
    }
})
export class CdkCalendarRangeCellDirective {

    private _dateAdapter = inject(CalendarDateAdapter)
    @Input({required: true})
    date: string
    minDate = input<string|null>(null)
    maxDate = input<string|null>(null)
    selectedDate =  input.required<string|null>()
    activeMonth = input.required<ActiveMonth>()


    get day(): number {
        return  this._dateAdapter.getDay(this.date)
    }

    isActiveMonth = computed(() => {
        return this.activeMonth()?.hasTheSameMonthAs(this.date)
    })

    isSelected = computed(() => {
        const selected = this.selectedDate()
        return selected && this.date ===  selected
    })

    disabled = computed(() => {
        const minDate = this.minDate()
        const maxDate = this.maxDate()
        return (minDate && this._dateAdapter.firstIsMoreThenSecond(minDate,this.date)) ||
            (maxDate && this._dateAdapter.firstIsMoreThenSecond(this.date,maxDate))
    })

    isToday = computed(()=> {
        return this.date === this._dateAdapter.today()
    })


    // isInRange = computed(()=> {
    //     return this.calendar.startDate()
    //         && this.calendar.endDate()
    //         && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.date, this.calendar.startDate())
    //         && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.calendar.endDate(), this.date)
    //
    // })
    //
    // isInHoverRange = computed(()=>{
    //     return this.calendar.startDate()
    //         && this.calendar.hoverDate()
    //         && this.calendar.endDate() == null
    //         && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.date, this.calendar.startDate())
    //         && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.calendar.endDate(), this.calendar.hoverDate())
    // })
    //
    // isEndOfHoverRange = computed(()=>{
    //     return this.calendar.startDate()
    //         && this.calendar.hoverDate()
    //         && this.calendar.endDate() == null
    //         && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.date, this.calendar.startDate())
    //         && this.date ===  this.calendar.hoverDate()
    // })
    //
    // isStartOfRange = computed(()=>{
    //     return this.calendar.startDate()
    //         && this.date  ===  this.calendar.startDate()
    // })
    //
    // isEndOfRange = computed(()=>{
    //     return this.calendar.endDate()
    //         && this.date ===  this.calendar.endDate()
    // })


}
