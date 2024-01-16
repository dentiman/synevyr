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
import {MultipleSelectListbox} from "./multiple-select-listbox";

let nextMultipleSelectOptionIndex = 0;
@Directive({
    selector: '[multipleSelectOption]',
    standalone: true,
    host: {
        'role': 'option',
        '[attr.aria-selected]': "selected()",
        '[attr.id]': "id",
    }
})
export class MultipleSelectOption implements ListKeyManagerOption, Highlightable, ListBoxOptionInterface {

    private _elementRef = inject(ElementRef<HTMLElement>)

    @Input('multipleSelectOption') value = null
    @Input('optionLabel') label = null


    active = computed(()=> {
      return  this.listBox.activeOption()?.id === this.id
    })

    selected =  computed(() => {
       return  !!this.listBox.value()?.find(val => val === this.value)
    })

    id = `option-${nextMultipleSelectOptionIndex++}`;

    protected readonly listBox = inject(MultipleSelectListbox)


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
