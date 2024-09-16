import {CalendarDateAdapter} from "./calendar-date-adapter";
import {computed, Signal, signal, WritableSignal} from "@angular/core";
import {toObservable} from "@angular/core/rxjs-interop";
import {Observable} from "rxjs";

export class ActiveMonth {
    private _dateAdapter: CalendarDateAdapter;
    private _activeDate: WritableSignal<string>;

    constructor(changes: Observable<any>, dateAdapter: CalendarDateAdapter) {
        this._dateAdapter = dateAdapter;
        this._activeDate = signal(this._dateAdapter.today());

        //TODO: unsubscribe
        changes.subscribe((value) => {
            this.setFromDate(value);
        });

    }

    year = computed(()=>{
      return   this._dateAdapter.getYear(this._activeDate())
    })

    month = computed(()=>{
        return   this._dateAdapter.getMonth(this._activeDate())
    })

    monthName = computed(()=>{
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const monthIndex = this.month()-1;
        return monthNames[monthIndex];
    })

    weeks: Signal<string[][]> = computed(() => {
        const year = this.year()
        const month = this.month()
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

