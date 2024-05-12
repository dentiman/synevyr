import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@synevyr/ui';
import { CdkTooltipDirective } from '@synevyr/cdk';

@Component({
  selector: 'sui-tooltip-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CdkTooltipDirective],
  templateUrl: './tooltip-page.component.html',
})
export class TooltipPageComponent {}
