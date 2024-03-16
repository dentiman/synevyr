import {InjectionToken, Signal,
  WritableSignal
} from '@angular/core';
import {  CdkPopupPanelDirective } from '../popup/popup.directive';


import { CdkSelectListboxDirective } from './select-listbox.directive';

export interface CcSelectControlInterface {
  value: WritableSignal<any>;
  listbox: Signal<CdkSelectListboxDirective | undefined>;
  portal: Signal<CdkPopupPanelDirective | undefined>;
}


export const SELECT_CONTROL = new InjectionToken<CcSelectControlInterface>('SELECT_CONTROL');
