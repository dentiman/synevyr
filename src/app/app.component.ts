import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatepickerModule, PopupModule } from '@synevyr/cdk';

@Component({
  standalone: true,
  imports: [RouterModule, DatepickerModule, PopupModule],
  selector: 'synevyr-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'synevyr';
}
