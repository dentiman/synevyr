import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@synevyr/ui';
import { CdkPopupCloseOnClickDirective, CdkPopupPanelDirective, CdkPopupTriggerForDirective } from '@synevyr/cdk';

@Component({
  selector: 'synevyr-dropdown',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CdkPopupTriggerForDirective, CdkPopupCloseOnClickDirective, CdkPopupPanelDirective],
  templateUrl: './dropdown-page.component.html',
})
export class DropdownPageComponent {}
