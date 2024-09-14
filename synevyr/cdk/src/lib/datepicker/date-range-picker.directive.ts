import {
    computed,
    DestroyRef,
    Directive,
    effect, EventEmitter,
    inject,
    input,
    Input,
    model, output,
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
export class CdkDateRangePickerDirective {
    private _dateAdapter = inject(CalendarDateAdapter)

    isRangePicker = input<boolean>(false)

    minDate = input<string|null>(null)
    maxDate = input<string|null>(null)

    @Input() format: string = 'y-MM-dd'




    selectedDate =  signal<string|null>(null)
    startDate =     signal<string|null>(null)
    endDate =       signal<string|null>(null)
    hoverDate =     signal<string|null>(null)

    daySelect = output<string|null>()

    value = model<string|DateRange>(null)

    startDateModel = model<string>()
    endDateModel = model<string>()

    activeMonth = new ActiveMonth(this.value, this._dateAdapter)

    constructor() {

        toObservable(this.startDateModel)
            .pipe(takeUntilDestroyed())
            .subscribe((value) => {
                if (typeof value === "string" && this._isDateWithinRange(value)) {
                    this._updateDateIfValid(value, this.startDate);
                    this.activeMonth.setFromDate(value);
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

        this.daySelect.emit(date)
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
