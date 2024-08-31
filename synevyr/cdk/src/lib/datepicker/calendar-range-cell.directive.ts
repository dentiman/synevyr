import {computed, Directive, inject, Input} from '@angular/core';
import {END_DATE, HOVER_DATE, START_DATE} from "./datepicker.states";
import { CdkCalendarDirective } from './calendar.directive';
import { DialogRef } from '@angular/cdk/dialog';
import {toSignal} from "@angular/core/rxjs-interop";

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


    calendar = inject(CdkCalendarDirective)
    private dialogRef? = inject(DialogRef,{optional: true})

    @Input({required: true})
    date: Date

    _handleMouseenter() {

    }

    _handleMouseleave() {

    }

    isSelected = computed(() => {

        return false
    })

    isActiveMonth = computed(() => {
        return false
    })

    disabled = computed(() => {
    return false
    })

    isToday = computed(()=> {
        return this.date.toDateString() === (new Date).toDateString()
    })


    isInRange = computed(()=> {
     return false
    })

    isInHoverRange = computed(()=>{
        return false
    })

    isEndOfHoverRange = computed(()=>{
        return false
    })

    isStartOfRange = computed(()=>{
        return false
    })

    isEndOfRange = computed(()=>{
        return false
    })


    setBySelection() {

    }


}
