import {computed, Directive, inject, input, Input} from '@angular/core';
import {CalendarDateAdapter} from "./calendar-date-adapter";
import {DateSelectionModel} from "./date-selection-model";


@Directive({
    selector: '[cdkCalendarCell]',
    exportAs: 'cdkCalendarCell',
    standalone: true,
    host: {
        '[attr.disabled]': 'disabled() || null',
        '[attr.data-disabled]': 'disabled() || null',
        '[attr.data-today]': 'isToday()',
        '[attr.data-active-month]': 'isActiveMonth()',
        '[attr.data-selected]': 'isSelected()',
        '[attr.aria-selected]': 'isSelected()',
        '[attr.type]': '"button"',
        '(click)': 'selectionModel()?.selectDate(date)'
    }
})
export class CdkCalendarCellDirective {
    private _dateAdapter = inject(CalendarDateAdapter)
    @Input({required: true})
    date: string
    minDate = input<string|null>(null)
    maxDate = input<string|null>(null)
    selectionModel = input.required<DateSelectionModel>()


    get day(): number {
      return  this._dateAdapter.getDay(this.date)
    }

    isActiveMonth = computed(() => {
        return this.selectionModel()?.activeMonth.hasTheSameMonthAs(this.date)
    })

    isSelected = computed(() => {
        const selected = this.selectionModel()?.selectedDate()
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
