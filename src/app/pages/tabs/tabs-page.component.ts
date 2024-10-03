import { Component, computed, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkSelectListboxDirective,
  CdkSelectOptionDirective,
  CdkSingleSelectionModelDirective,
} from '@synevyr/cdk';
import { CdkPortal, CdkPortalOutlet } from '@angular/cdk/portal';

@Component({
  selector: 'sui-tabs-page',
  standalone: true,
  imports: [CommonModule, CdkSelectListboxDirective, CdkSelectOptionDirective, CdkPortal, CdkPortalOutlet, CdkSingleSelectionModelDirective],
  template: `
      <nav class="flex flex-1 flex-col max-w-sm" >
        <ul cdkSelectListbox [(cdkSingleSelectionModel)]="value" role="list" class="-mx-2 space-y-1">
          <li>
            <a [cdkSelectOption]="oneLink"
               [selected]="true"
               class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 text-gray-700 cursor-pointer
                 aria-selected:bg-indigo-500 aria-selected:aria-disabled:bg-indigo-300 aria-selected:text-white
                 aria-[selected=false]:data-[active=true]:bg-gray-100
                 aria-disabled:bg-gray-50 aria-disabled:cursor-not-allowed"
            >
              One
            </a>
          </li>
          <li>
            <a [cdkSelectOption]="twoLink"
               class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 text-gray-700 cursor-pointer
                 aria-selected:bg-indigo-500 aria-selected:aria-disabled:bg-indigo-300 aria-selected:text-white
                 aria-[selected=false]:data-[active=true]:bg-gray-100
                 aria-disabled:bg-gray-50 aria-disabled:cursor-not-allowed"
            >
              Two
            </a>
          </li>
        </ul>
      </nav>
    
    <ng-template cdkPortal #oneLink="cdkPortal" >One</ng-template>
    <ng-template cdkPortal #twoLink="cdkPortal" >Two</ng-template>
    <ng-template cdkPortal #twoLink="cdkPortal" >Three</ng-template>
    
 
    <ng-container [cdkPortalOutlet]="value()"></ng-container>
  `,
})
export class TabsPageComponent {

  value = signal(null)



}
