import { AfterViewInit, Component, inject, input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkControlStatusDirective, CdkListboxControlDirective,
  CdkSelectControlForDirective,
  CdkSelectListboxDirective, CdkSelectOptionDirective,
  SelectDisplayValueDirective
} from '@synevyr/cdk';

@Component({
  selector: 'button[suiSelectControl]',
  standalone: true,
  imports: [CommonModule, SelectDisplayValueDirective, CdkSelectListboxDirective, CdkSelectOptionDirective],
  templateUrl: './select-control.component.html',
  hostDirectives: [
    CdkSelectControlForDirective,
    CdkControlStatusDirective
  ],
  host: {
    'class': `relative  cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 
              shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 
              sm:text-sm sm:leading-6 disabled:bg-gray-200 disabled:bg-gray-200 aria-disabled:bg-gray-200 invalid:ring-red-600  
              aria-invalid:ring-pink-600`
  }
})
export class SuiSelectControlComponent implements AfterViewInit {

  readonly select = inject(CdkSelectControlForDirective)
  readonly valueControl = inject(CdkListboxControlDirective)

  options = input([])

  placeholder = input<string>('')

  @ViewChild('selectPortal',{read: TemplateRef}) portalTemplateRef!: TemplateRef<any>

  ngAfterViewInit(): void {
      this.select.portalTemplateRef = this.portalTemplateRef
  }

}
