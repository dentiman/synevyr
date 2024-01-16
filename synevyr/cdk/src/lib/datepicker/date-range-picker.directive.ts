import {Directive} from '@angular/core';
import {DateState, END_DATE, HOVER_DATE, SELECTION_DATE, START_DATE} from "./datepicker.states";

@Directive({
    selector: '[cdkDateRangePicker]',
    standalone: true,
    providers: [
        { provide: SELECTION_DATE, useClass: DateState },
        { provide: START_DATE, useClass: DateState },
        { provide: END_DATE, useClass: DateState },
        { provide: HOVER_DATE, useClass: DateState },
    ]
})
export class CdkDateRangePickerDirective {
}
