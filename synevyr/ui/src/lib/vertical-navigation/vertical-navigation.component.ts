import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RootNavigationItemComponent } from './root-navigation-item.component';
import { GroupNavigationItemComponent } from './group-navigation-item.component';



export type NavigationItem = {
  label: string;
  url?: string;
  icon?: any;
  badge?: string|number;
  children?: NavigationItem[];
}

@Component({
  selector: 'sui-vertical-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RootNavigationItemComponent, GroupNavigationItemComponent],
  template: `
    <nav class="flex flex-1 flex-col">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1">
            @for (item of items(); track item; let index = $index) {
                @if (item.children?.length > 0) {
                  <li suiGroupNavigationItem
                      [item]="item"></li>
                } @else {
                  <li suiRootNavigationItem
                      [item]="item"></li>
                }
            }
         </ul>
        </li>
      </ul>
    </nav>
  `,
})
export class VerticalNavigationComponent {
  items  = input.required<NavigationItem[]>()
  activeItemId = signal<number>(0)
  expandedItemId = signal<number>(0)
}
