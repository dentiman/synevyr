import { Component, input, Input } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'sui-avatar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './avatar.component.html',
  host: {
    'class': 'relative inline-block h-8 w-8'
  }
})
export class AvatarComponent {

  src = input<string|undefined>(undefined)
  alt  = input<string|undefined>(undefined)

}
