import { DestroyRef, Directive, effect, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SELECT_CONTROL } from './select-control-token';

@Directive({
  selector: '[cdkSelectTrigger]',
  standalone: true,
  host: {
    '(keydown)': 'onKeydown($event)',
    '[aria-expanded]': 'select.portal()?.isOpened()'
  }
})
export class CdkSelectTriggerDirective {

  select = inject(SELECT_CONTROL);
  elementRef = inject(ElementRef);
  destroyRef = inject(DestroyRef);
  onKeydown($event) {
    this.select.listbox()?.onKeydown($event);
  }

  constructor() {

    effect(() => {
      if (this.select.listbox()) {
        this.select.listbox().optionTriggered
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(
            () => {
              if (!this.select.listbox().multiple()) {
                this.select.portal()?.close();
              }
            }
          );
      }
    });

  }
}
