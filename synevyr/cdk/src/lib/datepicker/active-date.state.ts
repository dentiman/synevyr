import {CalendarDateAdapter} from "./calendar-date-adapter";
import {computed, Signal, signal, WritableSignal} from "@angular/core";

export class ActiveMonth {
    private _dateAdapter: CalendarDateAdapter;
    private _activeDate: WritableSignal<string>;

    constructor(dateAdapter: CalendarDateAdapter) {
        this._dateAdapter = dateAdapter;
        this._activeDate = signal(this._dateAdapter.today());
    }

    year = computed(()=>{
      return   this._dateAdapter.getYear(this._activeDate())
    })

    month = computed(()=>{
        return   this._dateAdapter.getMonth(this._activeDate())
    })

    setFromDate(date: string): void {
        //todo: check if month no changed -no need to update
        if ( typeof date === 'string'
            && this._dateAdapter.isValidDate(date)
            && this._dateAdapter.isEqualTo(date,this._activeDate()) === false
        ) {
            this._activeDate.set(date);
        }
    }

    setMonth(month: number): void {
        this._activeDate.update(date => this._dateAdapter.setMonth(date, month));
    }

    setNextMonth(): void {
        this._activeDate.update(date => this._dateAdapter.setNextMonth(date));
    }

    setPreviousMonth(): void {
        this._activeDate.update(date => this._dateAdapter.setPreviousMonth(date));
    }

    setYear(fullYear: number): void {
        this._activeDate.update(date => this._dateAdapter.setYear(date, fullYear));
    }

    setNextYear(): void {
        this._activeDate.update(date => this._dateAdapter.setNextYear(date));
    }

    setPreviousYear(): void {
        this._activeDate.update(date => this._dateAdapter.setPreviousYear(date));
    }

    hasTheSameMonthAs(date: string): boolean {
        return  this._dateAdapter.hasTheSameMonthAs(date,this._activeDate())
    }

    //set date from time

}

