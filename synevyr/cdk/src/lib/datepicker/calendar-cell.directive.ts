import {computed, Directive, inject, Input} from '@angular/core';
import {CdkCalendarDirective} from "./calendar.directive";
import {CalendarDateAdapter} from "./calendar-date-adapter";


@Directive({
    selector: '[cdkCalendarCell]',
    exportAs: 'cdkCalendarCell',
    standalone: true,
    host: {
        '(click)': 'select()',
        '[attr.disabled]': 'disabled() || null',
        '[attr.data-disabled]': 'disabled() || null',
        '[attr.data-today]': 'isToday()',
        '[attr.data-active-month]': 'isActiveMonth()',
        '[attr.data-selected]': 'isSelected()',
        '[attr.aria-selected]': 'isSelected()',
        '[attr.type]': '"button"'
    }
})
export class CdkCalendarCellDirective {

    calendar = inject(CdkCalendarDirective)
    private _dateAdapter = inject(CalendarDateAdapter)
    @Input({required: true})
    date: string

    select() {
        this.calendar.selectDate(this.date)

    }

    get day(): number {
      return  this._dateAdapter.getDay(this.date)
    }

    isActiveMonth = computed(() => {
        return this._dateAdapter.hasTheSameMonthAs(this.date, this.calendar.activeDate())
    })

    isSelected = computed(() => {
        const selected = this.calendar.selectedDate()
        return selected && this.date ===  selected
    })

    disabled = computed(() => {
        const minDate = this.calendar.minDate()
        const maxDate = this.calendar.maxDate()
        return (minDate && this._dateAdapter.firstIsMoreThenSecond(minDate,this.date)) ||
            (maxDate && this._dateAdapter.firstIsMoreThenSecond(this.date,maxDate))
    })

    isToday = computed(()=> {
        return this.date === this._dateAdapter.today()
    })


    isInRange = computed(()=> {
        return this.calendar.startDate()
            && this.calendar.endDate()
            && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.date, this.calendar.startDate())
            && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.calendar.endDate(), this.date)

    })

    isInHoverRange = computed(()=>{
        return this.calendar.startDate()
            && this.calendar.hoverDate()
            && this.calendar.endDate() == null
            && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.date, this.calendar.startDate())
            && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.calendar.endDate(), this.calendar.hoverDate())
    })

    isEndOfHoverRange = computed(()=>{
        return this.calendar.startDate()
            && this.calendar.hoverDate()
            && this.calendar.endDate() == null
            && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.date, this.calendar.startDate())
            && this.date ===  this.calendar.hoverDate()
    })

    isStartOfRange = computed(()=>{
        return this.calendar.startDate()
            && this.date  ===  this.calendar.startDate()
    })

    isEndOfRange = computed(()=>{
        return this.calendar.endDate()
            && this.date ===  this.calendar.endDate()
    })

}
