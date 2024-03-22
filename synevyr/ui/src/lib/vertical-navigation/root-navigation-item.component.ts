import { Component, computed, HostListener, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationItem, VerticalNavigationComponent } from './vertical-navigation.component';
import { ChildNavigationItemComponent } from './child-navigation-item.component';
import { TwClassDirective } from '@synevyr/cdk';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconComponent } from '../icon/icon.component';


@Component({
  selector: 'li[suiRootNavigationItem]',
  standalone: true,
  imports: [CommonModule, ChildNavigationItemComponent, TwClassDirective, RouterLink, RouterLinkActive, IconComponent],
  template: `
      <a routerLink="{{ item().url }}"  
         [routerLinkActive]="'active-link'"
         (isActiveChange)="onActiveLinkChanged($event)"
         class="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700"
         [twClass]="{'bg-gray-100': isActive(),'hover:bg-gray-50': !isActive()}"
         [attr.aria-controls]="'sub-menu-'+id"
         [attr.aria-expanded]="isActive()"
         (click)="activeItemId.set(id)"
      >
        @if (item()?.icon) {
          <sui-icon [icon]="item()?.icon"></sui-icon>
        }
        {{ item().label }}
      </a>
  `
})
export class RootNavigationItemComponent {
  id = Date.now() + Math.random()
  item  = input.required<NavigationItem>()
  navigation = inject(VerticalNavigationComponent);
  activeItemId = this.navigation.activeItemId;
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
