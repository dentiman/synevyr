import {DateAdapter} from "./date-adapter";
import {BehaviorSubject} from "rxjs";
import {toSignal} from "@angular/core/rxjs-interop";

export class ActiveDateState {
    constructor(private _dateAdapter:  DateAdapter) {
    }

    _date = new BehaviorSubject<Date>(this._dateAdapter.today())

    changes$ =  this._date.asObservable()

    value = toSignal(this.changes$)

    get() {
        return  this._date.value
    }

    set(date: Date ) {
        const  newDate = this._dateAdapter.getValidDateOrNull(date)
        if (newDate ) {
            this._setValidDate(newDate)
        }
    }

    private _setValidDate(date: Date) {
        if (this._dateAdapter.isEqualTo(date, this.get()) === false) {
            this._date.next(date)
        }
    }

    setMonth(month: number) {
        const activeDate =  this._dateAdapter.createSameDate(this.get())
        this._setValidDate(new Date(activeDate.setMonth(month)))
    }

    setNextMonth() {
        const activeDate = this._dateAdapter.createSameDate(this.get())
        this._setValidDate(new Date(activeDate.setMonth(activeDate.getMonth() + 1)))
    }

    setPreviousMonth() {
        const activeDate =  this._dateAdapter.createSameDate(this.get())
        this._setValidDate(new Date(activeDate.setMonth(activeDate.getMonth() - 1)))
    }

    setYear(fullYear: number) {
        const activeDate =  this._dateAdapter.createSameDate(this.get())
        this._setValidDate(new Date(activeDate.setFullYear(fullYear)))
    }

    setNextYear() {
        const activeDate = this._dateAdapter.createSameDate(this.get())
        this._setValidDate(new Date(activeDate.setFullYear(activeDate.getFullYear() + 1)))
    }

    setPreviousYear() {
        const activeDate =  this._dateAdapter.createSameDate(this.get())
        this._setValidDate(new Date(activeDate.setFullYear(activeDate.getFullYear() - 1)))
    }

    isNotTheSameMonthAs(date: Date) {
       return   !(this.get().getFullYear() === date.getFullYear() && this.get().getMonth() === date.getMonth())
    }

}
