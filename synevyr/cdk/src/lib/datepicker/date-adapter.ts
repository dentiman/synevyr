import {Injectable} from "@angular/core";

const ISO_8601_REGEX =
    /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;


@Injectable()
export class DateAdapter {

    createSameDate(date: Date): Date {
        return this.createNewDate(date.getFullYear(), date.getMonth(), date.getDate())
    }
    fromTime(number: number) {
        return this.resetTime(new Date(number))
    }

    today(): Date {
        return this.resetTime(new Date())
    }

    resetTime(date: Date): Date {
        return new Date(date.setHours(0, 0, 0, 0))
    }

    getValidDateOrNull(value: unknown): Date | null {
        return this.isDateInstance(value) && this.isValid(value as Date) ? (this.createSameDate(value as Date)) : null;
    }

    isValid(date: Date) {
        return !isNaN(date.getTime());
    }

    invalid(): Date {
        return new Date(NaN);
    }

    isDateInstance(value: unknown) {
        return value instanceof Date
    }

    createNewDate(year: number, month: number, date: number) {
        const newDate = new Date();
        newDate.setFullYear(year, month, date);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    }

    isEqualTo(first:Date, second:Date) {
        return  first.toDateString() === second.toDateString()
    }


    deserialize(value: any): Date | null {
        if (typeof value === 'string') {
            if (!value) {
                return null;
            }

            if (ISO_8601_REGEX.test(value)) {
                let date = new Date(value);
                if (this.isValid(date)) {
                    return date;
                }
            }
        }
        if (value == null || (this.isDateInstance(value) && this.isValid(value))) {
            return value;
        }
        return null;
    }
}
