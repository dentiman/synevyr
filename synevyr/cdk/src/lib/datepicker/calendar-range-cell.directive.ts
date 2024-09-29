import {computed, Directive, inject, input, Input} from '@angular/core';
import {CalendarDateAdapter} from "./calendar-date-adapter";
import {DateRangeSelectionModel} from "./date-selection-model";

@Directive({
    selector: '[cdkCalendarRangeCell]',
    exportAs: 'cdkCalendarRangeCell',
    standalone: true,
    host: {
        '(mouseenter)': '_handleMouseenter()',
        '(mouseleave)': '_handleMouseleave()',
    }
})
export class CdkCalendarRangeCellDirective {

    private _dateAdapter = inject(CalendarDateAdapter)
    @Input({required: true})
    date: string

    selectionModel = input.required<DateRangeSelectionModel>()

    startDate = computed(()=> {
        return this.selectionModel()?.startDate()
    })

    endDate = computed(()=> {
        return this.selectionModel()?.endDate()
    })

    hoverDate = computed(()=> {
        return this.selectionModel()?.hoverDate()
    })

    isInRange = computed(()=> {
        return this.startDate()
            && this.endDate()
            && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.date,this.startDate())
            && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.endDate(), this.date)

    })

    isInHoverRange = computed(()=>{
        return this.startDate()
            && this.hoverDate()
            && this.endDate() == null
            && this._dateAdapter.isDateWithinRange(this.date, this.startDate(), this.hoverDate())
    })

    isEndOfHoverRange = computed(()=>{
        return this.startDate()
            && this.hoverDate()
            && this.endDate() == null
            && this._dateAdapter.firstIsMoreOrEqualThenSecond(this.date, this.startDate())
            && this.date ===  this.hoverDate()
    })

    isStartOfRange = computed(()=>{
        return this.startDate()
            && this.date  ===  this.startDate()
    })

    isEndOfRange = computed(()=>{
        return this.endDate()
            && this.date ===  this.endDate()
    })

    _handleMouseenter() {
        this.selectionModel()?.hoverDate.set(this.date)
    }
    _handleMouseleave() {
        this.selectionModel()?.hoverDate.set(null)
    }


}
