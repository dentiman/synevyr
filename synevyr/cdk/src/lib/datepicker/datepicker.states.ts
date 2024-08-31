import {DateAdapter} from "./date-adapter";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Injectable, InjectionToken, signal} from "@angular/core";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";



export const SELECTION_DATE = new InjectionToken<DateState>('SELECTION_DATE')
export const START_DATE = new InjectionToken<DateState>('START_DATE')
export const END_DATE = new InjectionToken<DateState>('END_DATE')
export const HOVER_DATE = new InjectionToken<DateState>('HOVER_DATE')

@Injectable()
export class DateState {
    constructor(private _dateAdapter:  DateAdapter) {
    }

    _date = new Subject<Date|null>()
    changes$ =  this._date.asObservable()
    value = toSignal(this.changes$)

    setValue(date: Date | null ) {
        console.log('set -'+ date)
        const  newDateOrNull = this._dateAdapter.getValidDateOrNull(date)
        if(newDateOrNull === null && !this.value() === null) {
            this._date.next(null)
        } else if ( this.value() && newDateOrNull && !this._dateAdapter.isEqualTo(newDateOrNull, this.value())) {
            this._date.next(newDateOrNull)
        } else if(newDateOrNull) {

            this._date.next(newDateOrNull)
        }
    }
}
