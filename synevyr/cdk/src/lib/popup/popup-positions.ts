import {ConnectedPosition} from "@angular/cdk/overlay";

export const DROPDOWN_LEFT_POSITIONS: ConnectedPosition[] = [
    {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'},
    {originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom'},
    {originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top'},
    {originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom'},
];

export const DROPDOWN_CENTER_POSITIONS: ConnectedPosition[] = [
    {originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top'},
    {originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom'},
    {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'},
    {originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom'},
];
export const DROPDOWN_RIGHT_POSITIONS: ConnectedPosition[] = [
    {originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top'},
    {originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom'},
    {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'},
    {originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom'},
];
