import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkAutocompleteInputDirective,
  CdkListboxControlDirective, CdkPopupOriginDirective,
  CdkSelectDirective,
  CdkSelectListboxDirective, CdkSelectOptionDirective,
  CdkSelectPortalDirective,
  CdkSelectTriggerDirective
} from '@synevyr/cdk';

@Component({
  selector: 'sui-autocomplete',
  standalone: true,
  imports: [CommonModule, CdkSelectDirective, CdkSelectListboxDirective, CdkSelectPortalDirective, CdkSelectTriggerDirective, CdkSelectOptionDirective, CdkAutocompleteInputDirective, CdkPopupOriginDirective],
  templateUrl: './autocomplete.component.html',
  hostDirectives: [
    {
      directive: CdkListboxControlDirective,
    }
  ],
})
export class AutocompleteComponent {

  selectControl = inject(CdkListboxControlDirective);

  setValue($event) {
    this.selectControl.value.set($event.target.value)

  }

  @Input() items: string[]|number[] = []
}
