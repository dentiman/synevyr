import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@synevyr/ui';

@Component({
  selector: 'synevyr-button-page',
  standalone: true,
  imports: [CommonModule,  ButtonComponent],
  templateUrl: './button-page.component.html',
})
export class ButtonPageComponent {

  disabled = signal(false)
  loading = signal(false)
  toggleDisabled() {
    this.disabled.update(value => !value)
  }

  toggleLoading() {
    this.loading.update(value => !value)
  }
}
