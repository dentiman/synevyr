import {computed, Directive, inject, Input} from '@angular/core';
import {DateRangePicker} from "./date-range-picker";
import {DateAdapter} from "./date-adapter";
import {DateState, END_DATE, HOVER_DATE, START_DATE} from "./datepicker.states";
import {toSignal} from "@angular/core/rxjs-interop";

@Directive({
    selector: '[cdkCalendarRangeCell]',
    exportAs: 'cdkCalendarRangeCell',
    standalone: true,
    host: {
        '(mouseenter)': '_handleMouseenter()',
        '(mouseleave)': '_handleMouseleave()',
        '(click)': 'setBySelection()'
    }
})
export class CalendarRangeCell {

    startDate = inject(START_DATE,{optional: true})
    endDate = inject(END_DATE,{optional: true})
    hoverDate =  inject(HOVER_DATE,{optional: true})

    @Input({required: true})
    date: Date

    _handleMouseenter() {
        this.hoverDate?.setValue(this.date)
    }

    _handleMouseleave() {
        this.hoverDate?.setValue(null)
    }


    isInRange = computed(()=> {
        return this.startDate?.value()
         && this.endDate?.value()
         && this.date >= this.startDate.value()
         && this.date <= this.endDate.value()

    })

    isInHoverRange = computed(()=>{
        return this.startDate?.value()
            && this.hoverDate?.value()
            && this.endDate.value() == null
            && this.date >= this.startDate.value()
            && this.date <= this.hoverDate.value()
    })

    isEndOfHoverRange = computed(()=>{
        return this.startDate?.value()
            && this.hoverDate?.value()
            && this.endDate?.value() == null
            && this.date >= this.startDate.value()
            && this.date.toDateString() ===  this.hoverDate.value().toDateString()
    })

    isStartOfRange = computed(()=>{
        return this.startDate?.value()
            && this.date.toDateString() ===  this.startDate.value().toDateString()
    })

    isEndOfRange = computed(()=>{
        return this.endDate?.value()
            && this.date.toDateString() ===  this.endDate.value().toDateString()
    })


    setBySelection() {
        if(!this.startDate || !this.endDate) return;
        if (
            this.startDate.value() && this.endDate.value() === null
            && this.date >= this.startDate.value()
        ) {
            this.endDate.setValue(this.date)
        } else if (
            this.startDate.value() && this.endDate.value() === null
            && this.date < this.startDate.value()
        ) {
            this.startDate.setValue(this.date)
        } else {
            this.startDate.setValue(this.date)
            this.endDate.setValue(null)
        }
    }


}
