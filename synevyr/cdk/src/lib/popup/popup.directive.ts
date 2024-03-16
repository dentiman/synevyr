import {
    AfterContentInit,
    AfterViewInit,
    DestroyRef,
    Directive, effect,
    ElementRef, HostListener,
    inject,
    InjectionToken, input,
    Input, Signal, signal,
    TemplateRef, ViewContainerRef
} from '@angular/core';
import {POPUP_SERVICE} from "./popup.service";
import PopupRef from "./popup-ref";
import {fromEvent} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {BooleanInput, coerceBooleanProperty} from "@angular/cdk/coercion";
import PopupConfig, {POPUP_CONFIG, PopupRole} from "./popup-config";
import { ComponentType } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

export type Interaction = 'toggleOnClick' | 'openOnFocus' | 'openOnClick'


let popupNextId = 0;

export const POPUP = new InjectionToken<CdkPopupDirective>('POPUP')

@Directive({
    standalone: true
})
export abstract class CdkPopupDirective {

    abstract triggerRef: Signal<ElementRef<HTMLElement>>
    abstract componentOrTemplateRef: Signal<ComponentType<Element> | TemplateRef<Element>>

    private _id = `popup-id-${popupNextId++}`;

    private _popup = inject(POPUP_SERVICE)

    private popupConfig? = inject(POPUP_CONFIG, {optional: true})
    destroyRef = inject(DestroyRef);

    @Input({alias:'cdkPopupOrigin'}) originRef?: CdkPopupOriginDirective
    @Input() interaction: Interaction = 'toggleOnClick';
    @Input() popupRole?: PopupRole = 'menu'
    @Input() cdkPopupMaxHeight?: string | number
    @Input() cdkPopupMaxWidth?: string
    @Input() addPopupClass?: string[]

    @Input('hasTriggerElementWidth')
    get hasTriggerElementWidth() {
        return this._hasTriggerElementWidth
    }

    set hasTriggerElementWidth(value: BooleanInput) {
        this._hasTriggerElementWidth = coerceBooleanProperty(value);
    }

    private _hasTriggerElementWidth: boolean = false;

    popupRef?: PopupRef

    private _opened =  signal<boolean>(false)

    isOpened = this._opened.asReadonly()

    constructor() {
        effect(()=>{
            this.registerInteractionHandler(this.triggerRef().nativeElement)
        })
    }

    open() {

        let config: PopupConfig = {
            //TODO: make id to be required
            id: this._id,
            popupRole: this.popupRole,
            hasTriggerElementWidth: this._hasTriggerElementWidth,
            elementRef: this.originRef?.elementRef || this.triggerRef(),
            maxHeight: this.cdkPopupMaxHeight,
            width: this.cdkPopupMaxWidth,
            addPanelClass: this.addPopupClass
        }
        config = {...this.popupConfig ?? {}, ...config}

        this.popupRef = this._popup.open(this.componentOrTemplateRef(), config)
        console.log( this.popupRef)
        this._opened.set(true)
    }

    close() {
        console.log( 'close: ' + this.popupRef)
        this.popupRef?.close()
        this._opened.set(false)
    }

    public registerInteractionHandler(element: HTMLElement): void {

        fromEvent(element, this.interaction === 'openOnFocus' ? 'focus' : 'click')
            .pipe(
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(() => {
                if (this.interaction === 'toggleOnClick') {
                    this.toggle()
                } else if (this.interaction === 'openOnClick') {
                    this.open()
                } else if (this.interaction === 'openOnFocus') {
                    this.open()
                }
            });

    }


    toggle() {
        const opened = this.popupRef?.overlayRef.hasAttached()
        if (opened) {
            this.close();
        } else {
            this.open()
        }
    }

}




@Directive({
    selector: '[cdkPopupOrigin]',
    exportAs: 'cdkPopupOrigin',
    standalone: true,
})
export class CdkPopupOriginDirective {
    constructor(
        public elementRef: ElementRef,
    ) {
    }
}

@Directive({
    selector: '[cdkPopupPanel]',
    standalone: true,
    providers: [{provide: POPUP, useExisting: CdkPopupPanelDirective}]
})
export class CdkPopupPanelDirective extends CdkPopupDirective {
    triggerRef = input<ElementRef<HTMLElement>>()
    componentOrTemplateRef = signal(inject(TemplateRef)).asReadonly()
}


@Directive({
    selector: '[cdkPopupTriggerFor]',
    standalone: true,
    providers: [{provide: POPUP, useExisting: CdkPopupTriggerForDirective}]
})
export class CdkPopupTriggerForDirective extends CdkPopupDirective {

    triggerRef = signal(inject(ElementRef)).asReadonly()
    componentOrTemplateRef = input<ComponentType<Element> | TemplateRef<Element>>(null,{alias:'cdkPopupTriggerFor'})

}


@Directive({
    selector: '[cdkPopupCloseOnClick]',
    standalone: true,
})
export class CdkPopupCloseOnClickDirective {
    private _popup = inject(POPUP)

    @HostListener('click')
    close() {
        this._popup.close()
    }

}
