import { Component, computed, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavigationItem, VerticalNavigationComponent } from '@synevyr/ui';

const folderIconHtml = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 shrink-0 text-gray-400">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
</svg>
`

@Component({
  selector: 'app-root-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, VerticalNavigationComponent],
  templateUrl: './root-nav.component.html',
})
export class RootNavComponent {

  folderIcon = viewChild('folderSvgIcon');

  items = computed< NavigationItem[]>(()=>{
    return [
      {
        label: 'Components',
        url: null,
        icon: this.folderIcon(),
        children: [
          {
            label: 'Button',
            url: '/button'
          },
          {
            label: 'Checkbox',
            url: '/checkbox',
          },
          {
            label: 'Switch',
            url: '/switch',
          },
          {
            label: 'Chip',
            url: '/chip',
          },
          {
            label: 'Input',
            url: '/input',
          },
          {
            label: 'Datepicker',
            url: '/datepicker',
          },
          {
            label: 'Autocomplete',
            url: '/au',
          },
          {
            label: 'Radio',
            url: '/radio-box',
          },
          {
            label: 'Tooltips',
            url: '/tooltips',
          },
          {
            label: 'Popup Playground',
            url: '/popup-playground',
          },
          {
            label: 'Tabs',
            url: '/tabs',
          },
        ],
      },
      {
        label: 'Select',
        icon: this.folderIcon(),
        children: [
          {
            label: 'Single',
            url: '/select',
          },
          {
            label: 'Multiple',
            url: '/select-multiple',
          },
        ]
      },
      {
        label: 'Input',
        url: '/input',
        icon: folderIconHtml,
        children: [
          {
            label: 'Dropdown',
            url: '/dropdown',
            icon: this.folderIcon(),
          },
          {
            label: 'List',
            url: '/list',
            icon: this.folderIcon(),
          },
        ],
      },
    ];
  })
}
