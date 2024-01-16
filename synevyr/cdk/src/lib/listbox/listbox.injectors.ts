import {EventEmitter, InjectionToken, QueryList, Signal} from "@angular/core";
import {Highlightable} from "@angular/cdk/a11y";
import {Observable} from "rxjs";

export interface ListBoxOptionInterface extends Highlightable {
    select()
    activate()
}

export interface ListBoxInterface {
    activeOption: Signal<ListBoxOptionInterface>
    options: QueryList<ListBoxOptionInterface>
    activeOptionChange$: Observable<ListBoxOptionInterface>
    optionTriggered: EventEmitter<any>
}

export const LIST_BOX = new InjectionToken<ListBoxInterface>(
    'LIST_BOX',
);
