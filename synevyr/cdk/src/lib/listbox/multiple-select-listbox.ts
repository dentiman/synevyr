import {
    AfterContentInit,
    ContentChildren,
    Directive,
    inject,
    QueryList,
    signal,
    effect,
    computed,
    DestroyRef, EventEmitter, forwardRef
} from '@angular/core';

import {ListboxValueControl} from "./listbox-value-control";
import {takeUntilDestroyed, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {LIST_BOX, ListBoxInterface} from "./listbox.injectors";
import {MultipleSelectOption} from "./multiple-select-option";
import {filter, map, merge, Observable, Subject} from "rxjs";
import {startWith} from "rxjs/operators";



@Directive({
    selector: '[multipleSelectListbox]',
    exportAs: 'multipleSelectListbox',
    hostDirectives: [
        {
            directive: ListboxValueControl,
            inputs: ['value']
        }

    ],
    standalone: true,
    providers: [
        { provide: LIST_BOX, useExisting: MultipleSelectListbox }
    ],
})
export class MultipleSelectListbox implements AfterContentInit, ListBoxInterface, AfterContentInit {
    destroyRef = inject(DestroyRef);
    @ContentChildren( MultipleSelectOption, {descendants: true}) options: QueryList<MultipleSelectOption>

    options$ = new Subject<MultipleSelectOption[]>()

    valueControl: ListboxValueControl<Array<string|number>> = inject(ListboxValueControl)
    activeOption = signal<MultipleSelectOption| null>(null)
    activeOptionChange$ = toObservable(this.activeOption)
    value = toSignal(this.valueControl.valueChanges$)


    selectedOptions = toSignal(
        merge(
            this.valueControl.valueChanges$
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    map((values) => {
                        if(values === null)  return null
                        return  values
                            .map((value => this.options?.find( option => option.value === value ) ))
                            .filter(val => !!val)

                    })
                ),
            this.options$.asObservable()
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    map((options) => {
                        const values = this.valueControl.value
                        if(values === null)  return null
                        return  values
                            .map((value => options.find( option => option.value === value ) ))
                            .filter(val => !!val)
                    })
                )
        ),

    )
    optionTriggered = new EventEmitter()
    ngAfterContentInit(): void {

        this.options$.next(this.options.filter(()=>true))
        this.options.changes.pipe(
            takeUntilDestroyed(this.destroyRef),
            map((queryList) => queryList.filter(()=>true)),
        ).subscribe((options)=>{
            this.options$.next(options)
        })
    }

    triggerOption(option: MultipleSelectOption) {

        const value= this.value()

        if(value === null) {
            this.valueControl.value = [option.value]
            this.optionTriggered.emit([option.value])
            return
        }
        if(Array.isArray(value) && !!value.find((valueItem) => valueItem === option.value ) ) {
            this.valueControl.value = value.filter(valueItem => valueItem !== option.value)
            this.optionTriggered.emit( this.valueControl.value )
            return
        } else if(Array.isArray(value)) {
            this.valueControl.value = [...value,option.value]
            this.optionTriggered.emit( this.valueControl.value )
            return
        }
        throw Error('value is not Array');
    }

    removeValueItem(valueItem: string|number) {
        const oldValue = this.valueControl.value
        if(Array.isArray(oldValue) ) {
            this.valueControl.value = [...oldValue].filter((item => item !== valueItem))
        }
    }

}
