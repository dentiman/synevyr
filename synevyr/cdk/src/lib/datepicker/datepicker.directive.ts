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


@Directive({
    selector: '[cdkCalendar]',
    exportAs: 'cdkCalendar',
    standalone: true
})
export class CdkDatepickerDirective {
    private _dateAdapter = inject(CalendarDateAdapter)

    minDate = input<string|null>(null)
    maxDate = input<string|null>(null)

    @Input() format: string = 'y-MM-dd'




    selectedDate =  signal<string|null>(null)

    daySelect = output<string|null>()

    value = model<string>(null)
    activeMonth = new ActiveMonth(this.value, this._dateAdapter)

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
        this.value.set(date)


        if(date) {
            this.activeMonth.setFromDate(date)
        }

        this.daySelect.emit(date)
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
