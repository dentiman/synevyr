import {
  AfterViewInit,
  Component, computed, effect, ElementRef, forwardRef,
  inject,
  input, model,
  OnInit,
  signal,
  Signal,
  TemplateRef, viewChild,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CcSelectControlInterface,
  CdkControlStatusDirective,
  CdkPrimitiveValueAccessorDirective, CdkPopupPanelDirective,
  CdkSelectListboxDirective,
  CdkSelectOptionDirective,
  CdkSelectTriggerDirective,
  SELECT_CONTROL,
  SelectDisplayValueDirective, twc
} from '@synevyr/cdk';
import { SuiChipComponent } from '../chip/chip.component';
import { SuiCloseButtonComponent } from '../button/close-button.component';
import type { ClassValue } from 'clsx';

@Component({
  selector: 'sui-select,button[suiSelectControl]',
  standalone: true,
  imports: [CommonModule, SelectDisplayValueDirective, CdkSelectListboxDirective, CdkSelectOptionDirective, CdkPopupPanelDirective, SuiChipComponent, SuiCloseButtonComponent],
  templateUrl: './select-control.component.html',
  hostDirectives: [
    CdkSelectTriggerDirective,
    CdkPrimitiveValueAccessorDirective,
    CdkControlStatusDirective
  ],
  host: {
    '[class]': 'computedClass()',
    'tabindex': '0',
    '[style.pointer-events]': 'disabled() ? "none" : "auto"',
    '[attr.aria-disabled]': 'disabled()',
  },
  providers: [
    {
      provide: SELECT_CONTROL,
      useExisting:  forwardRef(() => SuiSelectControlComponent)
    }
  ],

})
export class SuiSelectControlComponent implements CcSelectControlInterface {

  options = input<{label:string,value:string}[]>([])
  multiple = input(false)
  placeholder = input<string>('')
  displaySelected = input<TemplateRef<any>|string|null>(null)
  disabled = inject(CdkPrimitiveValueAccessorDirective).disabled

  value = inject(CdkPrimitiveValueAccessorDirective).value
  listbox = viewChild(CdkSelectListboxDirective)
  portal = viewChild(CdkPopupPanelDirective)


  triggerRef = inject(ElementRef<HTMLElement>)

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
