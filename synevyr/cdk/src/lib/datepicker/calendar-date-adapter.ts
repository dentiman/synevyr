import {Injectable} from "@angular/core";

//delete all comments and remember this class for feature questions
@Injectable()
export class CalendarDateAdapter {

    // This method is ready
    today(): string  {
        return this.serializeNativeDateToString(new Date());
    }

    getDay(date: string): number {
        const [year, month, day] = date.split('-').map(Number);
        return day
    }

    getMonth(date: string): number {
        const [year, month, day] = date.split('-').map(Number);
        return  month
    }

    getYear(date: string): number {
        const [year, month, day] = date.split('-').map(Number);
        return  year
    }

    // Check if the string is a valid date in the format yyyy-MM-dd
    isValidDate(date: string): boolean {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(date)) return false;

        const [year, month, day] = date.split('-').map(Number);
        const dateObject = new Date(year, month - 1, day);

        return (
            dateObject.getFullYear() === year &&
            dateObject.getMonth() === month - 1 &&
            dateObject.getDate() === day
        );
    }

    // This method is ready
    isDateInstance(value: unknown): boolean {
        return value instanceof Date;
    }

    // This method is ready
    isEqualTo(first: string, second: string): boolean {
        return first === second;
    }

    // Check if the first date string is more or equal to the second
    firstIsMoreThenSecond(first: string, second: string): boolean {
        const firstDate = new Date(first);
        const secondDate = new Date(second);
        return firstDate > secondDate;
    }

    firstIsMoreOrEqualThenSecond(first: string, second: string): boolean {
        const firstDate = new Date(first);
        const secondDate = new Date(second);
        return firstDate >= secondDate;
    }

    // Return date string for a given month number
    setMonth(date: string, month: number): string {
        const [year, , day] = date.split('-');
        const newDate = new Date(Number(year), month - 1, Number(day));
        return this.serializeNativeDateToString(newDate);
    }

    // Return date string for the next month
    setNextMonth(date: string): string {
        const [year, month, day] = date.split('-').map(Number);
        const newDate = new Date(year, month - 1, day);

        // Move to the next month
        newDate.setMonth(newDate.getMonth() + 1);

        // Handle cases where the new date overflows into the next month
        if (newDate.getDate() !== day) {
            newDate.setDate(0); // Set to last day of previous month
        }

        return this.serializeNativeDateToString(newDate);
    }

    // Return date string for the previous month
    setPreviousMonth(date: string): string {
        const [year, month, day] = date.split('-').map(Number);
        const newDate = new Date(year, month - 2, day); // Month is 1-based here
        return this.serializeNativeDateToString(newDate);
    }


    setYear(date: string, fullYear: number): string {
        const [ , month, day] = date.split('-');
        const newDate = new Date(fullYear, Number(month) - 1, Number(day));
        return this.serializeNativeDateToString(newDate);
    }

    setNextYear(date: string): string {
        const [year, month, day] = date.split('-').map(Number);
        return this.setYear(date, year + 1);
    }


    setPreviousYear(date: string): string {
        const [year, month, day] = date.split('-').map(Number);
        return this.setYear(date, year - 1);
    }

    hasTheSameMonthAs(date: string, compareDate: string): boolean {
        const [, month1] = date.split('-');
        const [, month2] = compareDate.split('-');
        return month1 == month2;
    }



    serializeNativeDateToString(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}