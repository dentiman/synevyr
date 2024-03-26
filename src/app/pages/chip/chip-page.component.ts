import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent, SuiChipComponent, SuiCloseButtonComponent } from '@synevyr/ui';

@Component({
  selector: 'synevyr-chip-page',
  standalone: true,
  imports: [CommonModule, SuiChipComponent, SuiCloseButtonComponent, AvatarComponent],
  templateUrl: './chip-page.component.html',
})
export class ChipPageComponent {}
