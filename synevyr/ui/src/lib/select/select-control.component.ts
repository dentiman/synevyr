import {
  AfterViewInit,
  Component, effect, ElementRef, forwardRef,
  inject,
  input,
  OnInit,
  signal,
  Signal,
  TemplateRef,
  ViewChild,
  WritableSignal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CcSelectControlInterface,
  CdkControlStatusDirective,
  CdkListboxControlDirective, CdkPopupPanelDirective,
  CdkSelectListboxDirective,
  CdkSelectOptionDirective,
  CdkSelectTriggerDirective,
  SELECT_CONTROL,
  SelectDisplayValueDirective
} from '@synevyr/cdk';

@Component({
  selector: 'button[suiSelectControl]',
  standalone: true,
  imports: [CommonModule, SelectDisplayValueDirective, CdkSelectListboxDirective, CdkSelectOptionDirective,  CdkPopupPanelDirective],
  templateUrl: './select-control.component.html',
  hostDirectives: [
    CdkSelectTriggerDirective,
    CdkListboxControlDirective,
    CdkControlStatusDirective
  ],
  host: {
    'class': `relative  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 
              shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 
              sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:bg-gray-200 aria-disabled:bg-gray-200 invalid:ring-red-600  
              aria-invalid:ring-pink-600`
  },
  providers: [
    {
      provide: SELECT_CONTROL,
      useExisting:  forwardRef(() => SuiSelectControlComponent)
    }
  ]
})
export class SuiSelectControlComponent implements CcSelectControlInterface,AfterViewInit {

  readonly valueControl = inject(CdkListboxControlDirective)

  options = input([])

  placeholder = input<string>('')

  listbox: WritableSignal<CdkSelectListboxDirective> = signal(null);
  portal:  WritableSignal<CdkPopupPanelDirective> = signal(null);
  elementRef = inject(ElementRef)

  @ViewChild(CdkSelectListboxDirective)  _listbox: CdkSelectListboxDirective
  @ViewChild(CdkPopupPanelDirective)  _portal: CdkPopupPanelDirective

  constructor() {
    effect(() => {
      const portal =  this.portal();
      if(portal && portal.isOpened()) {
        setTimeout(()=>{
          console.log(this._listbox)
        },500)

      }
    });
  }

  ngAfterViewInit(): void {


    this.portal.set(this._portal)

  }



}
