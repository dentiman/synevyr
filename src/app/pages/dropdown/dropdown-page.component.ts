import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@synevyr/ui';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
  selector: 'synevyr-dropdown',
  standalone: true,
  imports: [CommonModule, ButtonComponent,  CdkMenuTrigger, CdkMenu, CdkMenuItem],
  templateUrl: './dropdown-page.component.html',
})
export class DropdownPageComponent {}
