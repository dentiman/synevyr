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

    activeDate =    signal<string>(this._dateAdapter.today())
    selectedDate =  signal<string|null>(null)
    startDate =     signal<string|null>(null)
    endDate =       signal<string|null>(null)
    hoverDate =     signal<string|null>(null)


    value = model<string|DateRange>(null)

        constructor() {

        toObservable(this.value)
            .pipe(takeUntilDestroyed())
            .subscribe((value) => {
                const isRangePicker = this.isRangePicker()
                if( isRangePicker === false) {
                    this._updateDateIfValid(value,this.selectedDate)
                    this._updateDateIfValid(value,this.activeDate)
                } else if( isRangePicker && typeof value === 'object')  {

                    if( value !== null && 'start' in value) {
                        this._updateDateIfValid(value.start, this.startDate)
                    }
                    if( value !== null && 'end' in value) {
                        this._updateDateIfValid(value.end, this.endDate)
                    }
                }
            })
    }


    weeks: Signal<string[][]> = computed(() => {
        const date = this.activeDate()
        return this._dateAdapter.getCalendarMonth(date)
    })

    getDay(date: string) {
        return this._dateAdapter.getDay(date)
    }

    setActiveMonth(month: number) {
       this.activeDate.update(date =>  this._dateAdapter.setMonth(date, month))
    }

    setActiveNextMonth() {
        this.activeDate.update(date =>  this._dateAdapter.setNextMonth(date))
    }

    setActivePreviousMonth() {
        this.activeDate.update(date =>  this._dateAdapter.setPreviousMonth(date))
    }

    setActiveYear(fullYear: number) {
        this.activeDate.update(date =>  this._dateAdapter.setYear(date, fullYear))
    }

    setActiveNextYear() {
        this.activeDate.update(date =>  this._dateAdapter.setNextYear(date))
    }

    setActivePreviousYear() {
        this.activeDate.update(date =>  this._dateAdapter.setPreviousYear(date))
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

        //todo: check if month no changed -no need to update
        if(date) {
            this.activeDate.set(date)
        }
    }

    //in this method in condition where I check if equal null need  check als if variable equal undefined
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
