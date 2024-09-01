import {
    computed,
    DestroyRef,
    Directive,
    effect, EventEmitter,
    inject,
    input,
    Input,
    model,
    Output,
    Signal,
    signal, WritableSignal
} from '@angular/core';
import {CalendarDateAdapter} from "./calendar-date-adapter";
import {takeUntilDestroyed, toObservable} from "@angular/core/rxjs-interop";
import {ActiveMonth} from "./active-date.state";

export type DateRange = {
    end: string| null,
    start:string | null
}

@Directive({
    selector: '[cdkCalendar]',
    exportAs: 'cdkCalendar',
    standalone: true
})
export class CdkCalendarDirective {
    private _dateAdapter = inject(CalendarDateAdapter)

    isRangePicker = input<boolean>(false)

    minDate = input<string|null>(null)
    maxDate = input<string|null>(null)

    @Input() format: string = 'y-MM-dd'


    activeMonth = new ActiveMonth(this._dateAdapter)

    selectedDate =  signal<string|null>(null)
    startDate =     signal<string|null>(null)
    endDate =       signal<string|null>(null)
    hoverDate =     signal<string|null>(null)


    value = model<string|DateRange>(null)

    constructor() {
        toObservable(this.value)
            .pipe(takeUntilDestroyed())
            .subscribe((value) => {
                const isRangePicker = this.isRangePicker();
                if (isRangePicker === false) {
                    // Update selectedDate only if date is within minDate and maxDate
                    if (typeof value === "string" && this._isDateWithinRange(value)) {
                        this._updateDateIfValid(value, this.selectedDate);
                        this.activeMonth.setFromDate(value);
                    }
                } else if (isRangePicker && typeof value === 'object') {
                    if (value !== null && 'start' in value) {
                        if (this._isDateWithinRange(value.start)) {
                            this._updateDateIfValid(value.start, this.startDate);
                        }
                    }
                    if (value !== null && 'end' in value) {
                        if (this._isDateWithinRange(value.end)) {
                            this._updateDateIfValid(value.end, this.endDate);
                        }
                    }
                }
            });
    }

// Helper method to check if a date is within the minDate and maxDate range
    private _isDateWithinRange(date: string | null): boolean {
        if (date === null) return false;

        const minDate = this.minDate();
        const maxDate = this.maxDate();

        const isAfterMinDate = minDate ? this._dateAdapter.firstIsMoreOrEqualThenSecond(date, minDate) : true;
        const isBeforeMaxDate = maxDate ? this._dateAdapter.firstIsMoreOrEqualThenSecond(maxDate, date) : true;

        return isAfterMinDate && isBeforeMaxDate;
    }



    weeks: Signal<string[][]> = computed(() => {
        const year = this.activeMonth.year()
        const month = this.activeMonth.month()
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0); // Last day of the given month

        const weeks: string[][] = [];
        let currentWeek: string[] = [];

        // Find the first day of the week (Sunday) for the first week of the month
        const currentDate = new Date(firstDayOfMonth);
        currentDate.setDate(currentDate.getDate() - currentDate.getDay());

        // Loop until we pass the last day of the month
        while (currentDate <= lastDayOfMonth || currentDate.getDay() !== 0) {
            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }

            currentWeek.push(this._dateAdapter.serializeNativeDateToString(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Add the last week if it's not complete
        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }

        return weeks;
    })

    selectDate(date: string | null) {
        this.selectedDate.set(date)


        if(this.isRangePicker()) {
            this._changeRangeSelection(date)
            this.value.set({
                end: this.endDate(),
                start: this.startDate()
            })
        } else {
            this.value.set(date)
        }


        if(date) {
            this.activeMonth.setFromDate(date)
        }
    }


    protected _changeRangeSelection(date: string) {
        const startDate = this.startDate()
        const endDate = this.endDate()

        if (
            startDate && (endDate === null || endDate === undefined) && this._dateAdapter.firstIsMoreOrEqualThenSecond( date , startDate)
        ) {
            this.endDate.set(date);
        } else if (
            startDate && (endDate === null || endDate === undefined) && this._dateAdapter.firstIsMoreOrEqualThenSecond( startDate, date)
        ) {
            this.startDate.set(date);
        } else {
            this.startDate.set(date);
            this.endDate.set(null);
        }
    }

    protected _updateDateIfValid(value, date: WritableSignal<string|null>) {
        if( typeof value ===  'string'
            && this._dateAdapter.isValidDate(value)
            && this._dateAdapter.isEqualTo(value,date()) === false
        ) {
            date.set(value)
        }

        if ( value === null && date() !== null )
        {
            date.set(null)
        }
    }



}
