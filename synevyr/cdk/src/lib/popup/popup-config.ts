import {DialogConfig} from "@angular/cdk/dialog";
import {ElementRef, InjectionToken} from "@angular/core";
import { BasePortalOutlet } from '@angular/cdk/portal';

export type PopupRole = 'dialog' | 'sidebar' | 'menu'

export const DEFAULT_DIALOG_CONFIG_DATA: DialogConfig = {
    panelClass: [ 'transform', 'rounded-xl', 'divide-y', 'divide-gray-100',
        'overflow-auto', 'bg-white', 'dark:bg-gray-700',
        'shadow-2xl','ring-1','ring-black','ring-opacity-5','transition-all',
        'translate-y-[-50px]','duration-300','ease-in-out']
}


export const DEFAULT_POPUP_MENU_CONFIG_DATA: DialogConfig = {
    panelClass: [ 'mt-1', 'rounded-md', 'divide-y', 'divide-gray-100',
        'overflow-auto', 'bg-white', 'dark:bg-gray-700',
        'shadow-lg','ring-1','ring-black','ring-opacity-5'
    ]
}


export  const  POPUP_CONFIG = new InjectionToken<PopupConfig>('POPUP_CONFIG')



export default  class PopupConfig<D = unknown, R = unknown, C extends BasePortalOutlet = BasePortalOutlet> extends DialogConfig<D , R , C > {
    readonly elementRef?: ElementRef
    hasOriginElementWidth?: boolean
    readonly popupRole?: PopupRole
    addPanelClass?: string[]
}
