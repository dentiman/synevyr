import { Component, computed, effect, inject, input, model, signal, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItem, VerticalNavigationComponent } from './vertical-navigation.component';
import { ChildNavigationItemComponent } from './child-navigation-item.component';
import { TwClassDirective } from '@synevyr/cdk';
import { RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
import { IconComponent } from '../icon/icon.component';


@Component({
  selector: 'li[suiGroupNavigationItem]',
  standalone: true,
  imports: [CommonModule, ChildNavigationItemComponent, TwClassDirective, RouterLinkActive, IconComponent],
  template: `
    <div>
      <button type="button"
              class="hover:bg-gray-50 flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
              [attr.aria-controls]="'sub-menu-'+id"
              [attr.aria-expanded]="expanded()"
              (click)="toggleExpand()"
      >
        @if (item()?.icon) {
          <sui-icon [icon]="item()?.icon"></sui-icon>
        }
        {{ item().label }}
        <svg class="text-gray-400 ml-auto h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor"
             [twClass]="{'rotate-90': expanded(),'text-gray-500': expanded()}">
          <path fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd" />
        </svg>
      </button>

      <ul [twClass]="{'block': expanded(),'hidden': !expanded() || item().children.length === 0 }"
          class="mt-1 px-2" [id]="'sub-menu-'+id">
        @for (child of item().children; track $index) {
          <li suiChildNavigationItem
              [(activeItemId)]="activeItemId"
              [item]="child"></li>
        }
      </ul>

    </div>
  `
})
export class GroupNavigationItemComponent {
  id = Date.now() + Math.random();
  item = input.required<NavigationItem>();
  navigation = inject(VerticalNavigationComponent);
  activeItemId = this.navigation.activeItemId;

  childNavigationItems = viewChildren(ChildNavigationItemComponent);

  expanded = computed(() => this.navigation.expandedItemId() === this.id);

  constructor(private sanitizer: DomSanitizer) {

    toObservable(this.isChildActive)
      .pipe(takeUntilDestroyed())
      .subscribe((isChildActive) => {
        if (isChildActive) {
          this.navigation.expandedItemId.set(this.id);
        }
      });
  }

  toggleExpand() {
    if (this.expanded()) {
      this.navigation.expandedItemId.set(0);
    } else {
      this.navigation.expandedItemId.set(this.id);
    }
  }

  isChildActive = computed(() => {
    return this.childNavigationItems().some(item => item.id === this.activeItemId());
  });


}
