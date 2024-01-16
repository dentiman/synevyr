import {DestroyRef, Directive,  inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {BehaviorSubject} from 'rxjs';
import {CdkCanDisableDirective} from '../common-behaviors/cdk-can-disable.directive';

@Directive({
    selector: '[listboxValueControl]',
    standalone: true,
    hostDirectives: [
        {
            directive: CdkCanDisableDirective,
            inputs: ['disabled', 'isLoading']
        }
    ]
})
export class ListboxValueControl<T> implements  ControlValueAccessor, OnInit {
    destroyRef = inject(DestroyRef);
    @Input()
    get value() {
        return this.valueChanges$.getValue()
    }
    set value(value: any) {
        const changed = !this._compareWith(this.value,value)
        if(changed) {
            this.valueChanges$.next(value)
        }
    }

    valueChanges$ = new BehaviorSubject<T>(null)

    constructor(public ngControl: NgControl) {
        this.ngControl. valueAccessor = this
    }

    private _compareWith: (o1: any, o2: any) => boolean = (o1: any, o2: any) => {
        if(Array.isArray(o1) && Array.isArray(o2)) {
          return  JSON.stringify(o1.sort()) === JSON.stringify(o2.sort())
        }
        return  o1 === o2;
    }

    private _onTouched = () => {};

   onChange: (value:T) => void = () => {};

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this._onTouched = fn;
    }


    setDisabledState(isDisabled: boolean): void {
    }

    writeValue(value: any): void {
        this.value = value
    }

    ngOnInit(): void {
        this.ngControl.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((value)=>{
            this.value = value
        })

        this.valueChanges$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((value)=> {
            this.onChange(value)
        })
    }
}
