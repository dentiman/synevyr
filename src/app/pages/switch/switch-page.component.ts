import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, SuiSwitchComponent } from '@synevyr/ui';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'synevyr-switch-page',
  standalone: true,
  imports: [CommonModule, SuiSwitchComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './switch-page.component.html',
})
export class SwitchPageComponent {

  control = new FormControl<boolean>(false)

  toggle() {
    this.control.setValue(!this.control.value)
  }
}
