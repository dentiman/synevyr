import {computed, Directive, inject, Input} from '@angular/core';
import {END_DATE, HOVER_DATE, START_DATE} from "./datepicker.states";
import { CdkCalendarDirective } from './calendar.directive';
import { DialogRef } from '@angular/cdk/dialog';

@Directive({
    selector: '[cdkCalendarRangeCell]',
    exportAs: 'cdkCalendarRangeCell',
    standalone: true,
    host: {
        '(mouseenter)': '_handleMouseenter()',
        '(mouseleave)': '_handleMouseleave()',
        '(click)': 'setBySelection()',
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

    startDate = inject(START_DATE,{optional: true})
    endDate = inject(END_DATE,{optional: true})
    hoverDate =  inject(HOVER_DATE,{optional: true})
    calendar = inject(CdkCalendarDirective)
    private dialogRef? = inject(DialogRef,{optional: true})

    @Input({required: true})
    date: Date

    _handleMouseenter() {
        this.hoverDate?.setValue(this.date)
    }

    _handleMouseleave() {
        this.hoverDate?.setValue(null)
    }

    isSelected = computed(() => {
        const selected = this.calendar.selected
        return selected && this.date.toDateString() === selected.toDateString()
    })

    isActiveMonth = computed(() => {
        return this.date.getMonth() === this.calendar.activeDate().getMonth()
    })

    disabled = computed(() => {
        const minDate = this.calendar.minDate()
        const maxDate = this.calendar.maxDate()
        return (minDate && minDate.getTime() > this.date.getTime()) ||
          (maxDate && maxDate.getTime() < this.date.getTime())
    })

    isToday = computed(()=> {
        return this.date.toDateString() === (new Date).toDateString()
    })

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
            this.dialogRef?.close()
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
