import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root-nav',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './root-nav.component.html',
})
export class RootNavComponent {}
