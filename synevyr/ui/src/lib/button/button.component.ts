import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiLoadingSpinComponent } from '../loading-spin/loading-spin.component';
import type { ClassValue } from 'clsx';
import { twc } from '@synevyr/cdk';

@Component({
  selector: 'sui-button,button[suiButton]',
  standalone: true,
  imports: [CommonModule, SuiLoadingSpinComponent],
  templateUrl: './button.component.html',

  host: {
    '[class]': '_computed()',
    'tabindex': '0',
    '[style.pointer-events]': 'disabledOrLoading() ? "none" : "auto"',
    '[attr.aria-disabled]': 'disabledOrLoading()',
  }
})
export class ButtonComponent {
  isLoading = input(false)
  disabled = input(false)
  disabledOrLoading = computed(() => this.disabled() || this.isLoading())

  _class = input<ClassValue>('',{alias: 'class'})

  _computed = computed(() => {
    return  twc(this.twClass, this._class());
  });

  twClass = 'inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  aria-disabled:opacity-50 cursor-pointer aria-disabled:cursor-not-allowed'
}
