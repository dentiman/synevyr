import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkPopupTriggerForDirective,
  CdkSelectDirective,
  CdkSelectListboxDirective,
  CdkSelectOptionDirective,
  CdkSelectPortalDirective, CdkSelectTriggerDirective
} from '@synevyr/cdk';

@Component({
  selector: 'sui-select',
  standalone: true,
  imports: [
    CommonModule,
    CdkSelectOptionDirective,
    CdkPopupTriggerForDirective,
    CdkSelectListboxDirective,
    CdkSelectTriggerDirective,
    CdkSelectPortalDirective
  ],
  hostDirectives: [
    {
      directive: CdkSelectDirective,
      inputs: ['cdkSelectMultiple: multipleSelect']
    }
  ],
  templateUrl: './select.component.html'
})
export class SuiSelectComponent {

  selectControl = inject(CdkSelectDirective)

  @Input() items: [{label:string, value: string|number}];

  displayValue = computed(()=> {
    const selected = this.selectControl.value()
    const items = this.items

    if(this.selectControl.multiple && Array.isArray(selected) && items) {
      // @ts-ignore
      return items.filter(item => selected.includes(item.value))
        .map(item => item.label)
        .join(', ')
    } else if(selected && items) {
      return items.find((item => item.value === selected))?.label
    } else {
      return null
    }
  })


}
