import {
    AfterContentInit,
    ContentChildren,
    Directive,
    inject,
    QueryList,
    signal,
    effect,
    computed,
    DestroyRef, EventEmitter
} from '@angular/core';
import {SingleSelectOption} from "./single-select-option";
import {ControlValueAccessor} from "@angular/forms";
import {ListboxValueControl} from "./listbox-value-control";
import {takeUntilDestroyed, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {LIST_BOX, ListBoxInterface} from "./listbox.injectors";
import {MultipleSelectOption} from "./multiple-select-option";
import {map, merge, Subject} from "rxjs";

@Directive({
    selector: '[singleSelectListbox]',
    exportAs: 'singleSelectListbox',
    hostDirectives: [
        {
            directive: ListboxValueControl,
            inputs: ['value']
        }
    ],
    standalone: true,
    providers: [
        {provide: LIST_BOX, useExisting: SingleSelectListbox}
    ],
})
export class SingleSelectListbox implements AfterContentInit, ListBoxInterface, AfterContentInit {
    destroyRef = inject(DestroyRef);
    @ContentChildren(SingleSelectOption, {descendants: true,}) options: QueryList<SingleSelectOption> = new QueryList<any>()
    options$ = new Subject<SingleSelectOption[]>()

    valueControl: ListboxValueControl<string|number> = inject(ListboxValueControl)

    activeOption = signal<SingleSelectOption| null>(null)
    activeOptionChange$ = toObservable(this.activeOption)
    value = toSignal(this.valueControl.valueChanges$)

    selectedOption = toSignal(
        merge(
            this.valueControl.valueChanges$
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    map((value) => {
                        if(value === null)  return null
                        return  this.options?.find( option => option.value === value )

                    })
                ),
            this.options$.asObservable()
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    map((options) => {
                        const value = this.valueControl.value
                        if(value === null)  return null
                        return options.find( option => option.value === value )
                    })
                )
        ),

    )

    optionTriggered = new EventEmitter()

    displayValue= computed(() => {
        return this.selectedOption() ? this.selectedOption().label :  this.valueControl.value
    })



    ngAfterContentInit(): void {
        this.options$.next(this.options.filter(()=>true))
        this.options.changes.pipe(
            takeUntilDestroyed(this.destroyRef),
            map((queryList) => queryList.filter(()=>true)),
        ).subscribe((options)=>{
            this.options$.next(options)
        })

    }

    triggerOption(option: SingleSelectOption) {
        this.valueControl.value = option.value
        this.optionTriggered.emit(option.value)
    }


}
