import { computed, Directive, inject, input } from '@angular/core';
import { CdkListboxControlDirective } from '@synevyr/cdk';

@Directive({
  selector: '[cdkSelectDisplayValue]',
  standalone: true,
  host: {
    '[innerHtml]': 'displayValue()',
    '[attr.data-empty]': 'selectControl.isEmpty() || null'
  }
})
export class SelectDisplayValueDirective {

  items = input([])

  placeholder = input<string>('')

  readonly selectControl = inject(CdkListboxControlDirective)


  displayValue = computed(() => {
    const selected = this.selectControl.value();
    const items = this.items();

    if (this.selectControl.multiple && Array.isArray(selected) && items) {
      // @ts-ignore
      return items.filter(item => selected.includes(item.value))
        .map(item => item.label)
        .join(', ');
    } else if (selected && items) {
      return items.find((item => item.value === selected))?.label;
    } else return this.placeholder();
  });
}
