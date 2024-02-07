import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sui-loading-spin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg class="spinner w-5 h-5 text-gray-400"  viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" stroke="currentColor"  fill="none"  [attr.stroke-width]="strokeWidth"></circle>
    </svg>
    <span class="sr-only">Loading...</span>
  `,
  styleUrls: ['./loading-spin.component.scss']
})
export class SuiLoadingSpinComponent {

  @Input() size: number
  @Input() strokeWidth: number = 6

}
