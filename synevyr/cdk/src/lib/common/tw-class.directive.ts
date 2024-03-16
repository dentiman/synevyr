import { computed, Directive, InjectionToken, input } from '@angular/core';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


export interface TwClassAwareInterface {
  twClass: ClassValue
}

export const TW_CLASS_AWARE = new InjectionToken<TwClassAwareInterface>('TW_CLASS')

export function twc(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}




@Directive({
  selector: '[twClass]',
  standalone: true,
  host: {
    '[class]': '_computed()',
  },
})
export class TwClassDirective {

  _class = input<ClassValue>('',{alias: 'twClass'})

   _computed = computed(() => {
    return  twc(this._class() as ClassValue);
  });


}
