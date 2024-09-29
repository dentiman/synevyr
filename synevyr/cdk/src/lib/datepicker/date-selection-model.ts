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
import {takeUntilDestroyed, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {filter, map, merge, Observable, pairwise, startWith, tap} from "rxjs";
import {ActiveMonth} from "./active-date.state";


export interface DateSelectionModel {
    selectDate(date: string | null): void
    changes: Observable<string | null>
    activeMonth: ActiveMonth
    selectedDate: Signal<string | null>
}

export class SingleDateSelectionModel implements DateSelectionModel {

    selectedDate: Signal<string | null>
    changes: Observable<string | null>
    activeMonth: ActiveMonth
    constructor(
        protected source: WritableSignal<any>,
        protected _dateAdapter: CalendarDateAdapter

    ) {
        this.selectedDate = toSignal(toObservable(source).pipe(
            takeUntilDestroyed(),
            startWith(undefined),
            pairwise(),
            filter(([prev,current]) => {
                if(current === null && prev !== null) { return true }
                if( typeof current ===  'string' && !this._dateAdapter.isValidDate(current)) { return false }
                return !(typeof current === 'string' && typeof prev === 'string' && this._dateAdapter.isEqualTo(current, prev));
            }),
            map(([prev,current]) => current)
        ))

        this.changes = toObservable(this.selectedDate)
        this.activeMonth = new ActiveMonth(this.changes , this._dateAdapter)

    }
    selectDate(date: string | null) {
        this.source.set(date)
    }
}

export class DateRangeSelectionModel implements DateSelectionModel {

    hoverDate: WritableSignal<string | null> = signal(null)
    selectedDate: Signal<string | null>  = signal(null)
    startDate: Signal<string | null>
    endDate: Signal<string | null>
    changes: Observable<string | null>
    activeMonth: ActiveMonth
    constructor(
        protected startDateSource: WritableSignal<any>,
        protected endDateSource: WritableSignal<any>,
        protected _dateAdapter: CalendarDateAdapter

    ) {

        const startDate$ = this.filterSource(startDateSource)
        this.startDate = toSignal(startDate$)
        const endDate$ = this.filterSource(endDateSource)
        this.endDate = toSignal(endDate$)

        this.changes = merge(startDate$, endDate$)
        this.activeMonth = new ActiveMonth(this.changes , this._dateAdapter)

    }
    selectDate(date: string | null) {
        const startDate = this.startDate()
        const endDate = this.endDate()

        if (
            startDate && (endDate === null || endDate === undefined) && this._dateAdapter.firstIsMoreOrEqualThenSecond( date , startDate)
        ) {
            this.endDateSource.set(date);
        } else if (
            startDate && (endDate === null || endDate === undefined) && this._dateAdapter.firstIsMoreOrEqualThenSecond( startDate, date)
        ) {
            this.startDateSource.set(date);
        } else {
            this.startDateSource.set(date);
            this.endDateSource.set(null);
        }
    }

    filterSource(source: WritableSignal<any>) {
       return  toObservable(source).pipe(
            takeUntilDestroyed(),
            startWith(undefined),
            pairwise(),
            filter(([prev,current]) => {
                if(current === null && prev !== null) { return true }
                if( typeof current ===  'string' && !this._dateAdapter.isValidDate(current)) { return false }
                return !(typeof current === 'string' && typeof prev === 'string' && this._dateAdapter.isEqualTo(current, prev));
            }),
            map(([prev,current]) => current)
        )
    }
}
