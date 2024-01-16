import {
    AfterContentInit,
    computed,
    Directive,
    effect,
    ElementRef,
    HostListener,
    inject,
    Input,
    signal
} from '@angular/core';
import {SingleSelectListbox} from "./single-select-listbox";
import {Highlightable, ListKeyManagerOption} from "@angular/cdk/a11y";
import {ListBoxOptionInterface} from "./listbox.injectors";

let nextSingleSelectOptionIndex = 0;
@Directive({
    selector: '[singleSelectOption]',
    standalone: true,
    host: {
        'role': 'option',
        '[attr.aria-selected]': "selected()",
        '[attr.id]': "id",
    }
})
export class SingleSelectOption implements ListKeyManagerOption, Highlightable, ListBoxOptionInterface {

    private _elementRef = inject(ElementRef<HTMLElement>)

    @Input('singleSelectOption') value = null
    @Input('optionLabel') label = null


    active = computed(()=>{
      return  this.listBox.activeOption()?.id === this.id
    })

    selected =  computed(()=>{
    return  this.listBox.value() === this.value
    })

    id = `option-${nextSingleSelectOptionIndex++}`;

    protected readonly listBox = inject(SingleSelectListbox)


    @HostListener('click')
    select() {
        this.listBox.triggerOption(this)
    }

    @HostListener('mouseenter')
    activate() {
        this.listBox.activeOption.set(this)
    }

    disabled: boolean;

    getLabel(): string | null {
        return this.label;
    }

    setActiveStyles(): void {
        this.activate()
        this.scrollIntoView()
    }

    setInactiveStyles(): void {
    }

    scrollIntoView() {
        if (typeof this._elementRef.nativeElement.scrollIntoView !== 'undefined')
            this._elementRef.nativeElement.scrollIntoView({
                block: 'nearest'
            });
    }
}
