import {Injectable} from "@angular/core";

@Injectable()
export class CalendarDateAdapter {

    //this method is ready
    today(): string  {
        return this.serializeNativeDateToString(new Date())
    }


    //TODO:  check if string is valid date for format yyyy-MM-dd
    isValidDate(date: string): boolean {
        return false
    }

    //this method is ready
    isDateInstance(value: unknown) {
        return value instanceof Date
    }


    //this method is ready
    isEqualTo(first:string, second:string) {
        return  first === second
    }

    //TODO:  check if first date string is more or equal than second
    firstIsMoreThenSecond(first: string, second: string): boolean {
        return false
    }

    //TODO: date is string in format yyyy-MM-dd; Need to return date for month number
    setMonth(date: string, month: number): string {
        return ''
    }

    //TODO: date is string in format yyyy-MM-dd; Need to return date fot next month
    setNextMonth(date: string): string {
        return ''
    }

    setPreviousMonth(date: string): string {
        return ''
    }

    setYear(date: string, fullYear: number): string {
        return ''
    }

    setNextYear(): string {
        return ''
    }

    setPreviousYear(): string {
        return ''
    }

    hasNotTheSameMonthAs(date: string, compareDate: string): boolean {
        return   false
    }

    serializeNativeDateToString(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

}

console.log(new CalendarDateAdapter().today());