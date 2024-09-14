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


export class DateSelectionModel {

    selectedDate = signal<string|null>(null)


    constructor(
        protected soure: WritableSignal<any>,
        protected _dateAdapter: CalendarDateAdapter

    ) {
        toObservable(this.soure)
            .pipe(takeUntilDestroyed())
            .subscribe((value) => {
                this._updateDateIfValid(value, this.selectedDate);
            });
    }



    protected _updateDateIfValid(value, date: WritableSignal<string|null>) {
        if( typeof value ===  'string'
            && this._dateAdapter.isValidDate(value)
            && this._dateAdapter.isEqualTo(value,this.selectedDate()) === false
        ) {
            this.selectedDate.set(value)
        }

        if ( value === null && date() !== null )
        {
            this.selectedDate.set(null)
        }
    }

}
