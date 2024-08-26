import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatepickerModule} from '@synevyr/cdk';

@Component({
  standalone: true,
  imports: [RouterModule, DatepickerModule],
  selector: 'synevyr-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'synevyr';
}
