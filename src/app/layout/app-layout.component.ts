import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RootNavComponent } from './root-nav.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RootNavComponent],
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {}
