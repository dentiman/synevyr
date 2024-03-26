import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@synevyr/ui';

@Component({
  selector: 'synevyr-radio-box-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './radio-box-page.component.html',
})
export class RadioBoxPageComponent {
  control = new FormControl(1)

  items = [
    { value: 1, label: 'First' },
    { value: 2, label: 'Second' },
    { value: 3, label: 'Third' },
    { value: 4, label: 'Four' },
    { value: 5, label: 'Five' },
    { value: 6, label: 'Dix' }
  ]

  addItems() {
    this.items = [
      { value: 1, label: 'First' },
      { value: 2, label: 'Second' },
      { value: 3, label: 'Third' },
      { value: 4, label: 'Four' },
      { value: 5, label: 'Five' },
      { value: 6, label: 'Dix' },
      { value: 7, label: 'Seven' },
      { value: 8, label: 'Eight' }
    ]

  }

  toggle() {
    this.control.setValue(4)
  }


}
