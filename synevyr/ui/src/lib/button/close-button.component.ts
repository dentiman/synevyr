import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ClassValue } from 'clsx';
import { twc } from '@synevyr/cdk';

@Component({
  selector: 'sui-close-button,button[suiCloseButton]',
  standalone: true,
  imports: [CommonModule],
  template: `
      <svg class="m-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>`,
  host: {
    '[class]': '_computed()',
    'tabindex': '0',
    '[style.pointer-events]': 'disabled() ? "none" : "auto"',
    '[attr.aria-disabled]': 'disabled()',
  }
})
export class SuiCloseButtonComponent {

  disabled = input(false)

  _class = input<ClassValue>('',{alias: 'class'})

  _computed = computed(() => {
    return  twc(this.twClass, this._class());
  });

  twClass = 'rounded-full text-gray-500 shadow-sm hover:bg-red-700/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-gray-50 aria-disabled:bg-gray-300'
}
