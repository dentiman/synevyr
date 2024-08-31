import {Injectable} from "@angular/core";

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

    // Set the year of the date string
    setYear(date: string, fullYear: number): string {
        const [ , month, day] = date.split('-');
        const newDate = new Date(fullYear, Number(month) - 1, Number(day));
        return this.serializeNativeDateToString(newDate);
    }

    // Set the date to the same date in the next year
    setNextYear(date: string): string {
        const [year, month, day] = date.split('-').map(Number);
        return this.setYear(date, year + 1);
    }

    // Set the date to the same date in the previous year
    setPreviousYear(date: string): string {
        const [year, month, day] = date.split('-').map(Number);
        return this.setYear(date, year - 1);
    }

    // Check if the two dates have different months
    hasTheSameMonthAs(date: string, compareDate: string): boolean {
        const [, month1] = date.split('-');
        const [, month2] = compareDate.split('-');
        return month1 == month2;
    }

    //TODO:: need to return dates for render calendar month. It will bee array of weeks for date from parameter; every week has array of 7 days

    getCalendarMonth(date: string): string[][] {
        const [year, month] = date.split('-').map(Number);
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0); // Last day of the given month

        const weeks: string[][] = [];
        let currentWeek: string[] = [];

        // Find the first day of the week (Sunday) for the first week of the month
        let currentDate = new Date(firstDayOfMonth);
        currentDate.setDate(currentDate.getDate() - currentDate.getDay());

        // Loop until we pass the last day of the month
        while (currentDate <= lastDayOfMonth || currentDate.getDay() !== 0) {
            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }

            currentWeek.push(this.serializeNativeDateToString(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Add the last week if it's not complete
        if (currentWeek.length > 0) {
            weeks.push(currentWeek);
        }

        return weeks;
    }

    // This method is ready
    serializeNativeDateToString(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}