import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkPopupTriggerForDirective, SelectBoxDirective, SelectOptionDirective } from '@synevyr/cdk';

@Component({
  selector: 'sui-select',
  standalone: true,
  imports: [CommonModule, SelectBoxDirective, SelectOptionDirective, CdkPopupTriggerForDirective],
  templateUrl: './select.component.html',
})
export class SuiSelectComponent {

items = [

]
}
