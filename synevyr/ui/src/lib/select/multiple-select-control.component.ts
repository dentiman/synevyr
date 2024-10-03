import {
  AfterViewInit,
  Component, computed, DestroyRef, effect, ElementRef, forwardRef,
  inject,
  input, model,
  OnInit,
  signal,
  TemplateRef, viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkControlStatusDirective,
  CdkPrimitiveValueAccessorDirective,
  CdkSelectListboxDirective,
  CdkSelectOptionDirective,
  SelectDisplayValueDirective, twc, popup, CdkSingleSelectionModelDirective, CdkMultipleSelectionModelDirective
} from '@synevyr/cdk';
import { SuiChipComponent } from '../chip/chip.component';
import { SuiCloseButtonComponent } from '../button/close-button.component';
import type { ClassValue } from 'clsx';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sui-multiple-select,button[suiMultipleSelect]',
  standalone: true,
  imports: [CommonModule, SelectDisplayValueDirective, CdkSelectListboxDirective, CdkSelectOptionDirective,
    SuiChipComponent, SuiCloseButtonComponent, CdkSingleSelectionModelDirective, CdkMultipleSelectionModelDirective],
  template: `
    @if(displaySelected() === 'chip' && !isEmpty() ) {
      <span class="w-full flex flex-wrap  gap-x-1.5  gap-y-1.5 ">
        @for  (value of value();track value) {
          <sui-chip [disabled]="disabled()" class="h-6 rounded-md">
             <span cdkSelectDisplayValue
                   [value]="value" [items]="options()"
                   class="truncate "></span>
            @if(!disabled()) {
              <sui-close-button (click)="removeValue(value)" class="-mr-1"></sui-close-button>
            }
          </sui-chip>
        }
  </span>
    } @else {
      <span cdkSelectDisplayValue [value]="value()" [items]="options()" [placeholder]="placeholder()"
            class="truncate data-[empty=true]:text-gray-700"></span>
    }

    @if ( isEmpty() || disabled() ) {
      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clip-rule="evenodd" />
          </svg>
    </span>
    } @else {
      <span class="absolute inset-y-0 right-0 flex items-center pr-2">
  <button (click)="value.set([])" type="button" class="rounded-full  p-1 text-gray-500 shadow-sm hover:bg-gray-200">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
      <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
  </button>
  </span>
    }

    <ng-template #selectPortal>
      <ul cdkSelectListbox  [(cdkMultipleSelectionModel)]="value" [disabled]="disabled()" >
        @for (item of options();track item.value) {
          <li>
            <a [cdkSelectOption]="item.value"

               class="group flex gap-x-3  p-2 text-sm leading-6 text-gray-700 cursor-pointer
           aria-selected:bg-indigo-500 aria-selected:aria-disabled:bg-indigo-300 aria-selected:text-white
           aria-[selected=false]:data-[active=true]:bg-gray-100
           aria-disabled:bg-gray-50 aria-disabled:cursor-not-allowed"
            >
              {{ item.label }}
            </a>
          </li>
        }
      </ul>
    </ng-template>

  `,
  hostDirectives: [
    CdkPrimitiveValueAccessorDirective,
    CdkControlStatusDirective
  ],
  host: {
    '[class]': 'computedClass()',
    'tabindex': '0',
    '[style.pointer-events]': 'disabled() ? "none" : "auto"',
    '[attr.aria-disabled]': 'disabled()',
    '(keydown)': 'onKeydown($event)',
    '[aria-expanded]': 'popupRef.opened()',
    '(click)': 'popupRef.open()',
  },

})
export class MultipleSelectControlComponent  {

  options = input<{label:string,value:string}[]>([])
  multiple = input(false)
  placeholder = input<string>('')
  displaySelected = input<TemplateRef<any>|string|null>(null)
  disabled = inject(CdkPrimitiveValueAccessorDirective).disabled

  value = inject(CdkPrimitiveValueAccessorDirective<any[]>).value

  listbox = viewChild(CdkSelectListboxDirective)

  triggerRef = signal(inject(ElementRef)).asReadonly()
  portalRef = viewChild<TemplateRef<any>>('selectPortal')


  // @ts-ignore
  popupRef = popup(computed(()=>{
    return {
      componentOrTemplateRef: this.portalRef(),
      elementRef: this.triggerRef(),
      hasOriginElementWidth: true
    }
  }))

  onKeydown($event) {
    this.listbox()?.onKeydown($event);
  }


  class = input<ClassValue>('',{alias: 'class'})

  computedClass = computed(() => {
    return  twc(this.twClass, this.class());
  });


  twClass = 'relative block w-full cursor-default rounded-md bg-white  py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600  sm:text-sm sm:leading-6 disabled:bg-gray-200  aria-disabled:bg-gray-200 invalid:ring-red-600  aria-invalid:ring-pink-600'

  isEmpty = computed(()=> {
    const value  = this.value()
    return value === null || value === '' || (Array.isArray(value) && value.length === 0)
  })

  removeValue(value: any) {
      this.value.update( val => val.filter(v => v !== value))
  }

}
