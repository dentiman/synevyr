import {computed, Directive, inject, Input} from '@angular/core';
import {CdkCalendarDirective} from "./calendar.directive";
import { DialogRef } from '@angular/cdk/dialog';

@Directive({
    selector: '[cdkCalendarCell]',
    exportAs: 'cdkCalendarCell',
    standalone: true,
    host: {
        '(click)': 'select()',
        '[attr.disabled]': 'disabled() || null',
        '[attr.type]': '"button"'
    }
})
export class CdkCalendarCellDirective {

    calendar = inject(CdkCalendarDirective)
    private dialogRef? = inject(DialogRef,{optional: true})

    @Input({required: true})
    date: Date

    select() {
        this.calendar.selectDate(this.date)
        this.dialogRef?.close()
    }

    isActiveMonth = computed(() => {
        return this.date.getMonth() === this.calendar.activeDate().getMonth()
    })

    isSelected = computed(() => {
        const selected = this.calendar.selected
        return selected && this.date.toDateString() === selected.toDateString()
    })

    disabled = computed(() => {
        const minDate = this.calendar.minDate
        const maxDate = this.calendar.maxDate
        return (minDate && minDate.getTime() > this.date.getTime()) ||
               (maxDate && maxDate.getTime() < this.date.getTime())
    })

    isToday = computed(()=> {
        return this.date.toDateString() === (new Date).toDateString()
    })

}
