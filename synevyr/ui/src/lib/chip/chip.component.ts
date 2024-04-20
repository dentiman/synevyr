import { Component, computed, ContentChild, ElementRef, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AvatarComponent} from "../avatar/avatar.component";
import { SuiCloseButtonComponent } from '../button/close-button.component';
import type { ClassValue } from 'clsx';
import { twc } from '@synevyr/cdk';

@Component({
  selector: 'sui-chip,button[suiChip]',
  standalone: true,
  imports: [CommonModule, AvatarComponent, SuiCloseButtonComponent],
  template:'<ng-content></ng-content>',
  host: {
    '[class]': '_computed()',
    'tabindex': '0',
    '[style.pointer-events]': 'disabled() ? "none" : "auto"',
    '[attr.aria-disabled]': 'disabled()',
  }
})
export class SuiChipComponent  {

  @ContentChild(AvatarComponent, {read: ElementRef}) avatar?: ElementRef

  disabled = input(false)

  _class = input<ClassValue>('',{alias: 'class'})

  _computed = computed(() => {
    return  twc(this.twClass, this._class());
  });

  twClass = '[word-wrap:break-word] flex h-8 w-fit cursor-pointer items-center justify-between space-x-2 rounded-[16px] bg-[#eceff1] px-2 py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200'

}
