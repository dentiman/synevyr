import { Component, computed, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkSelectListboxDirective,
  CdkSelectOptionDirective,
  CdkSingleSelectionModelDirective,
} from '@synevyr/cdk';
import { CdkPortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { SuiTabNavBarComponent } from '@synevyr/ui';

@Component({
  selector: 'sui-tabs-page',
  standalone: true,
  imports: [CommonModule, CdkSelectListboxDirective, CdkSelectOptionDirective, CdkPortal, CdkPortalOutlet, CdkSingleSelectionModelDirective, SuiTabNavBarComponent],
  template: `
    <sui-tab-nav-bar></sui-tab-nav-bar>

  `,
})
export class TabsPageComponent {



}
