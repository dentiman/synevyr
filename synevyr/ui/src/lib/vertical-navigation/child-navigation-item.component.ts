import { Component, computed, HostListener, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItem } from './vertical-navigation.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TwClassDirective } from '@synevyr/cdk';
import { IconComponent } from '../icon/icon.component';


@Component({
  selector: 'li[suiChildNavigationItem]',
  standalone: true,
  imports: [CommonModule, RouterLink, TwClassDirective, RouterLinkActive, IconComponent],
  template: `
      <a routerLink="{{ item().url }}"
         [routerLinkActive]="'active-link'"
         (isActiveChange)="onActiveLinkChanged($event)"
         class="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-x-3 rounded-md py-2 pr-2 pl-9 text-sm leading-6"
         [twClass]="{'bg-gray-100 text-indigo-600': isActive(),'hover:bg-gray-50': !isActive()}"
      >
        @if (item()?.icon) {
          <sui-icon [icon]="item()?.icon"></sui-icon>
        }
        {{ item().label }}
        @if (item()?.badge) {
          <span class="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200" aria-hidden="true">5</span>
        }
      </a>
  `
})
export class ChildNavigationItemComponent {
  id = Date.now() + Math.random()
  item  = input.required<NavigationItem>()
  activeItemId = model.required<number>()
  isActive = computed(() => this.activeItemId() === this.id)

  onActiveLinkChanged(isActive: boolean) {
    if(isActive) {
      this.activeItemId.set(this.id)
    }
  }
  @HostListener('click')
  handleClick() {
    this.activeItemId.set(this.id)
  }
}
