import {computed, Directive, inject, Input, Output, Signal, signal} from '@angular/core';
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";
import {DateAdapter} from "./date-adapter";
import {ActiveDateState} from "./active-date.state";
import { SELECTION_DATE, START_DATE } from './datepicker.states';


@Directive({
    selector: '[cdkCalendar]',
    exportAs: 'cdkCalendar',
    standalone: true
})
export class CdkCalendarDirective {

    private _dateAdapter = inject(DateAdapter)

    isRangePicker = !!inject(START_DATE, { optional: true })

    @Input()
    get minDate() {
        return this.min()
    }

    set minDate(value: Date | null) {
        this.min.set(this._dateAdapter.getValidDateOrNull(value))
    }

    min = signal<Date>(null)

    @Input()
    get maxDate() {
        return this.max()
    }

    set maxDate(value: Date | null) {
        this.max.set(this._dateAdapter.getValidDateOrNull(value))
    }

    max = signal<Date>(null)


    private _activeDateState = new ActiveDateState(this._dateAdapter)
    private _selectedDateState =  inject(SELECTION_DATE)

    activeDate = toSignal(this._activeDateState.changes$)

    selectedDate =  toSignal(this._selectedDateState.changes$)

    @Input()
    get selected() {
        return this.selectedDate()
    }

    set selected(value: Date | null) {
        this.selectDate(this._dateAdapter.getValidDateOrNull(value))
    }

    @Output() readonly selectedChange = this._selectedDateState.changes$


    constructor() {
        this._selectedDateState.changes$
            .pipe(takeUntilDestroyed())
            .subscribe((selected) => {
                const compareDate = selected ? selected : this._dateAdapter.today()
                if(this._activeDateState.isNotTheSameMonthAs(compareDate)) {
                    this._activeDateState.set( compareDate)
                }
            })
    }


    weeks: Signal<Date[][]> = computed(() => {
        const date = this.activeDate()
        const startMonthDate = this._dateAdapter.createNewDate(date.getFullYear(), date.getMonth(), 1);

        const dayOfWeek = startMonthDate.getDay();
        const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        const startOfWeekDate = this._dateAdapter.fromTime(startMonthDate.setDate(startMonthDate.getDate() - daysToSubtract));
        const weeks = []

        let nextDate = this._dateAdapter.fromTime(startOfWeekDate.getTime())
        for (let w = 1; w <= 6; w++) {
            const daysOfWeek = []
            for (let d = 1; d <= 7; d++) {
                daysOfWeek.push(this._dateAdapter.fromTime(nextDate.getTime()))
                nextDate = this._dateAdapter.fromTime(nextDate.setDate(nextDate.getDate() + 1))
            }
            weeks.push(daysOfWeek)
        }
        return weeks

    })


    setActiveMonth(month: number) {
        this._activeDateState.setMonth(month)
    }

    setActiveNextMonth() {
        this._activeDateState.setNextMonth()
    }

    setActivePreviousMonth() {
        this._activeDateState.setPreviousMonth()
    }

    setActiveYear(fullYear: number) {
        this._activeDateState.setYear(fullYear)
    }

    setActiveNextYear() {
        this._activeDateState.setNextYear();
    }

    setActivePreviousYear() {
        this._activeDateState.setPreviousYear()
    }
    selectDate(date: Date | null) {
        this._selectedDateState.setValue(date)
    }



}
