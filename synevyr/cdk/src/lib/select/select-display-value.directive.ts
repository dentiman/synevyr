import { computed, Directive, inject, input } from '@angular/core';

@Directive({
  selector: '[cdkSelectDisplayValue]',
  standalone: true,
  host: {
    '[innerHtml]': 'displayValue()',
    '[attr.data-empty]': 'isEmpty() || null'
  }
})
export class SelectDisplayValueDirective {

  items = input([])

  placeholder = input<string>('')

  value = input<string | number | string[] | number[]>('')

  displayValue = computed(() => {
    const selected = this.value();
    const items = this.items();

    if(this.isEmpty()) {
      return this.placeholder();
    } else if ( Array.isArray(selected) && items) {
      // @ts-ignore
      return items.filter(item => selected.includes(item.value))
        .map(item => item.label)
        .join(', ');
    } else if (selected && items) {
      return items.find((item => item.value === selected))?.label;
    } else return this.placeholder();
  });

  isEmpty = computed(()=> {
    const value = this.value()
    return value === null || value === '' || (Array.isArray(value) && value.length === 0)
  })
}
