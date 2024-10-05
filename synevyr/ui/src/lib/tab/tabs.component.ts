import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkSelectListboxDirective, CdkSelectOptionDirective, CdkSingleSelectionModelDirective } from '@synevyr/cdk';
import { CdkPortal, CdkPortalOutlet, Portal } from '@angular/cdk/portal';

@Component({
  selector: 'sui-tab-nav-bar',
  standalone: true,
  imports: [CommonModule, CdkSelectListboxDirective, CdkSingleSelectionModelDirective, CdkSelectOptionDirective, CdkPortal, CdkPortalOutlet],
  template: `
    <nav  cdkSelectListbox [(cdkSingleSelectionModel)]="activeTab" class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
      <!-- Current: "text-gray-900", Default: "text-gray-500 hover:text-gray-700" -->
      <a [cdkSelectOption]="myAccount"
         [selected]="true" 
         class="group relative min-w-0 flex-1 overflow-hidden rounded-l-lg bg-white px-4 py-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10" aria-current="page">
        <span>My Account</span>
        <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500"></span>
      </a>
      <a [cdkSelectOption]="company"
        class="group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:z-10">
        <span>Company</span>
        <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-0.5 bg-transparent"></span>
      </a>
      <a  [cdkSelectOption]="members" 
          class="group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 focus:z-10">
        <span>Team Members</span>
        <span aria-hidden="true" class="absolute inset-x-0 bottom-0 h-0.5 bg-transparent"></span>
      </a>
    </nav>

    <ng-template cdkPortal #myAccount="cdkPortal" >My Account</ng-template>
    <ng-template cdkPortal #company="cdkPortal" >Company</ng-template>
    <ng-template cdkPortal #members="cdkPortal" >Team Members</ng-template>
    
    
    <ng-container  [cdkPortalOutlet]="activeTab()"></ng-container>
  
  `,
})
export class SuiTabNavBarComponent {

  activeTab = signal<Portal<any>>(null)

}
