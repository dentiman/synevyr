import { Component, computed, inject, input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type Icon =  string | SafeHtml | TemplateRef<any>| undefined | null;

@Component({
  selector: 'sui-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
})
export class IconComponent {

  sanitizer = inject(DomSanitizer);
  icon = input<Icon>();

  iconTemplateRef = computed(()=>{
    if(this.icon() instanceof TemplateRef) {
      return this.icon() as TemplateRef<any>;
    }
    return null;
  })

  iconHtml = computed(()=>{
    const icon = this.icon()
    if(icon  && typeof icon === 'string') {
      return this.sanitizer.bypassSecurityTrustHtml(icon);
    }
    return null;
  })


}
