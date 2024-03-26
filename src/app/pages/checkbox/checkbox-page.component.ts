import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@synevyr/ui';

@Component({
  selector: 'synevyr-checkbox-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './checkbox-page.component.html',
})
export class CheckboxPageComponent {
  control = new FormControl<boolean>(false)

  toggle() {
    this.control.setValue(!this.control.value)
  }

}
