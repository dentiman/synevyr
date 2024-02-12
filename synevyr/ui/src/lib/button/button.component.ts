import { Component,  input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuiLoadingSpinComponent } from '../loading-spin/loading-spin.component';

@Component({
  selector: 'button[suiButton]',
  standalone: true,
  imports: [CommonModule, SuiLoadingSpinComponent],
  templateUrl: './button.component.html',
  host: {
    '[disabled]': 'disabled()',
    'class': `inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold 
    text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-300
    `
  }
})
export class ButtonComponent {
  isLoading = input(false)

  disabled = input(false)
}
