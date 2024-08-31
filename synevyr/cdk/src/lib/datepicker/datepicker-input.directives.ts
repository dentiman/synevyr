import {
    AfterContentInit,
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    inject,
    Input,
    OnInit,
    Renderer2
} from '@angular/core';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {formatDate} from "@angular/common";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {DateAdapter} from "./date-adapter";
import {DateState, END_DATE, SELECTION_DATE, START_DATE} from "./datepicker.states";

@Directive()
export class DatepickerInputBase implements ControlValueAccessor {

    @Input() format: string = 'y-MM-dd'

    onChange = (_: any) => {};

    onTouched = () => {};
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private _dateAdapter: DateAdapter,
        private _dateState: DateState
    ) {
        this._dateState.changes$
            .pipe(takeUntilDestroyed())
            .subscribe((date)=> {
                if(date === null) {
                    this._renderer.setProperty(this._elementRef.nativeElement, 'value', '');
                    this.onChange(null);
                } else {
                    const newStringValue = formatDate(date, this.format,'en')
                    this._renderer.setProperty(this._elementRef.nativeElement, 'value', newStringValue );
                    this.onChange(newStringValue);
                }

            })
    }


    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }


    setDisabledState(isDisabled: boolean): void {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }

    writeValue(value: any): void {
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', value == null ? '' : value);

    }

    @HostListener('input', ['$event.target.value'])
    _handleInput(value: any): void {
        if(value === '' || value === null ) {
            this._dateState.setValue(null)
            //TODO: form can be not nullable
            this.onChange(null);
            return;
        }
        const validDate = this._dateAdapter.deserialize(value)
        if(validDate) {
            this._dateState.setValue(validDate)
            this.onChange(value);
        }
    }

}

@Directive({
    selector: 'input[cdkDatepickerInput]',
    standalone: true,
    providers: [
        {
            provide:NG_VALUE_ACCESSOR,
            useExisting: forwardRef(()=>CdkDatepickerInputDirective),
            multi: true
        },
        {
            provide: DateState,  useExisting: forwardRef(()=> SELECTION_DATE),
        }
    ]
})
export class CdkDatepickerInputDirective extends  DatepickerInputBase{
}


@Directive({
    selector: 'input[cdkStartDateInput]',
    standalone: true,
    providers: [
        {
            provide:NG_VALUE_ACCESSOR,
            useExisting: forwardRef(()=> CdkStartDateInputDirective ),
            multi: true
        },
        {
            provide: DateState,  useExisting: forwardRef(()=> START_DATE),
        }
    ]
})
export class CdkStartDateInputDirective extends  DatepickerInputBase{
}


@Directive({
    selector: 'input[cdkEndDateInput]',
    standalone: true,
    providers: [
        {
            provide:NG_VALUE_ACCESSOR,
            useExisting: forwardRef(()=> CdkEndDateInputDirective ),
            multi: true
        },
        {
            provide: DateState,  useExisting: forwardRef(()=> END_DATE),
        }
    ]
})
export class CdkEndDateInputDirective extends  DatepickerInputBase{
}
