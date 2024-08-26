import {Directive} from '@angular/core';
import {DateState, SELECTION_DATE} from "./datepicker.states";

@Directive({
    selector: '[cdkDatepicker]',
    exportAs: 'cdkDatepicker',
    standalone: true,
    providers: [
        { provide: SELECTION_DATE, useClass: DateState },
    ]
})
export class DatepickerDirective {

}
