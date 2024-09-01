import {Inject, Injectable, InjectionToken} from "@angular/core";
import { format, parse, isValid } from "date-fns";

export const CALENDAR_DATE_FORMAT = new InjectionToken<string>('DATE_FORMAT');


@Injectable()
export class CalendarDateAdapter {
    private dateFormat: string;

    constructor(@Inject(CALENDAR_DATE_FORMAT) dateFormat: string) {
        this.dateFormat = dateFormat || 'yyyy-MM-dd';
    }

    // This method is ready
    today(): string {
        return this.serializeNativeDateToString(new Date());
    }

    getDay(date: string): number {
        const parsedDate = this.parseDate(date);
        return parsedDate.getDate();
    }

    getMonth(date: string): number {
        const parsedDate = this.parseDate(date);
        return parsedDate.getMonth() + 1;
    }

    getYear(date: string): number {
        const parsedDate = this.parseDate(date);
        return parsedDate.getFullYear();
    }

    isValidDate(date: string): boolean {
        const parsedDate = this.parseDate(date);
        return isValid(parsedDate);
    }

    isDateInstance(value: unknown): boolean {
        return value instanceof Date;
    }

    isEqualTo(first: string, second: string): boolean {
        return first === second;
    }

    firstIsMoreThenSecond(first: string, second: string): boolean {
        const firstDate = this.parseDate(first);
        const secondDate = this.parseDate(second);
        return firstDate > secondDate;
    }

    firstIsMoreOrEqualThenSecond(first: string, second: string): boolean {
        const firstDate = this.parseDate(first);
        const secondDate = this.parseDate(second);
        return firstDate >= secondDate;
    }

    setMonth(date: string, month: number): string {
        const parsedDate = this.parseDate(date);
        parsedDate.setMonth(month - 1);
        return this.serializeNativeDateToString(parsedDate);
    }

    setNextMonth(date: string): string {
        const parsedDate = this.parseDate(date);
        parsedDate.setMonth(parsedDate.getMonth() + 1);

        // Handle overflow into the next month
        if (parsedDate.getDate() < parseInt(date.split('-')[2])) {
            parsedDate.setDate(0); // Set to the last day of the previous month
        }

        return this.serializeNativeDateToString(parsedDate);
    }

    setPreviousMonth(date: string): string {
        const parsedDate = this.parseDate(date);
        parsedDate.setMonth(parsedDate.getMonth() - 1);
        return this.serializeNativeDateToString(parsedDate);
    }

    setYear(date: string, fullYear: number): string {
        const parsedDate = this.parseDate(date);
        parsedDate.setFullYear(fullYear);
        return this.serializeNativeDateToString(parsedDate);
    }

    setNextYear(date: string): string {
        const parsedDate = this.parseDate(date);
        parsedDate.setFullYear(parsedDate.getFullYear() + 1);
        return this.serializeNativeDateToString(parsedDate);
    }

    setPreviousYear(date: string): string {
        const parsedDate = this.parseDate(date);
        parsedDate.setFullYear(parsedDate.getFullYear() - 1);
        return this.serializeNativeDateToString(parsedDate);
    }

    hasTheSameMonthAs(date: string, compareDate: string): boolean {
        return this.getMonth(date) === this.getMonth(compareDate);
    }

    serializeNativeDateToString(date: Date): string {
        return format(date, this.dateFormat);
    }

    private parseDate(date: string): Date {
        return parse(date, this.dateFormat, new Date());
    }
}