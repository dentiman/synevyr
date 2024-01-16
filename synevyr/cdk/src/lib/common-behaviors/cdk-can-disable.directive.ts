import {DestroyRef, Directive, ElementRef, inject, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {NgControl} from "@angular/forms";
import {BehaviorSubject, distinctUntilChanged, filter, map, mergeWith, Subject} from "rxjs";
import {takeUntilDestroyed, toSignal} from "@angular/core/rxjs-interop";
import {merge} from 'rxjs';

@Directive({
    selector: '[cdkCanDisable]',
    standalone: true,
    host: {
        '[attr.disabled]': "disabledSignal() || null",
        '[class.cursor-pointer]': 'disabledSignal() === false && isLoading === false',
        '[class.cursor-not-allowed]': 'disabledSignal() === true && isLoading === false',
        '[class.cursor-progress]': 'isLoading === true',
    }
})
export class CdkCanDisableDirective implements OnInit {

    destroyRef = inject(DestroyRef);
    ngControl? = inject(NgControl, {optional: true})

    private _disabled$ = new BehaviorSubject(false);

    disabled$ = this._disabled$.asObservable()

    disabledSignal = toSignal(this.disabled$)

    parentDisabled$? = inject(CdkCanDisableDirective, {optional: true, skipSelf: true})?.disabled$

    @Input('disabled')
    get disabled(): boolean {
        return false;
    }

    set disabled(value: any) {
        this._disabled$.next(coerceBooleanProperty(value));
    }


    @Input('isLoading')
    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: any) {
        this._isLoading = coerceBooleanProperty(value);
    }

    private _isLoading: boolean = false;

    constructor(private _elementRef: ElementRef) {
    }

    ngOnInit(): void {
        merge(
            ...[
                this.ngControl?.statusChanges.pipe(
                    map(status => status === 'DISABLED'),
                ),
                this.parentDisabled$
            ].filter(observableOrNull => !!observableOrNull)
        )
            .pipe(distinctUntilChanged(),takeUntilDestroyed(this.destroyRef),)
            .subscribe((disabled) => {
                this._disabled$.next(disabled)
            })
    }
}
