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
  SelectDisplayValueDirective, twc, popup
} from '@synevyr/cdk';
import { SuiChipComponent } from '../chip/chip.component';
import { SuiCloseButtonComponent } from '../button/close-button.component';
import type { ClassValue } from 'clsx';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sui-select,button[suiSelectControl]',
  standalone: true,
  imports: [CommonModule, SelectDisplayValueDirective, CdkSelectListboxDirective, CdkSelectOptionDirective,
    SuiChipComponent, SuiCloseButtonComponent],
  templateUrl: './select-control.component.html',
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
export class SuiSelectControlComponent  {

  options = input<{label:string,value:string}[]>([])
  multiple = input(false)
  placeholder = input<string>('')
  displaySelected = input<TemplateRef<any>|string|null>(null)
  disabled = inject(CdkPrimitiveValueAccessorDirective).disabled

  value = inject(CdkPrimitiveValueAccessorDirective).value
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

  constructor(destroyRef: DestroyRef) {

    effect(() => {

        this.listbox()?.optionTriggered
          .pipe(takeUntilDestroyed(destroyRef))
          .subscribe(
            () => {
              if (!this.listbox()?.multiple()) {
                this.popupRef.close();
              }
            }
          );

    });

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

    if (this.multiple() && Array.isArray(this.value())) {
      // @ts-ignore1
      this.value.update( val => val.filter(v => v !== value))

    }
  }

}
