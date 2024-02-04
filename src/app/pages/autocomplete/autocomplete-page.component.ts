import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from '@synevyr/ui';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'synevyr-autocomplete-page',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './autocomplete-page.component.html',
})
export class AutocompletePageComponent {

  ctrl = new FormControl(1)

  model = 'One'

  items: string[] = [
    'One',
    'Two',
    'Three',
    'For'
  ]

}
