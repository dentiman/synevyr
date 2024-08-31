import {computed, Directive, ElementRef, inject, input, TemplateRef} from '@angular/core';
import {popup} from "./popup-ref";
import {toObservable} from "@angular/core/rxjs-interop";
import {CdkPopupOriginDirective} from "./popup-origin.directive";

@Directive({
    selector: '[cdkPopupPortal]',
    standalone: true,
    exportAs: 'cdkPopupPortal'
})
export class PopupPortalDirective {

    popupOriginRef = input<CdkPopupOriginDirective>()
    popupTemplateRef = inject(TemplateRef)

    popupRef = popup(toObservable(computed(()=>{
        return {
            componentOrTemplateRef: this.popupTemplateRef,
            elementRef: this.popupOriginRef()?.elementRef
        }
    })))
}