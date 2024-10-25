import { ConnectedPosition } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';

export type OverlayPosition =
  'left' |
  'left.top' |
  'left.center' |
  'left.bottom' |
  'right' |
  'right.top' |
  'right.center' |
  'right.bottom' |
  'above' |
  'above.left' |
  'above.center' |
  'above.right' |
  'below' |
  'below.left' |
  'below.center' |
  'below.right';

const popupClasses = 'rounded-md  font-semibold  transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-slate-900 text-white min-h-7 text-sm left-1/2 -translate-x-1/2 after:absolute after:block after:size-0 after:border-8 after:border-transparent after:border-t-slate-900 after:bottom-[-0.95rem] after:left-1/2 after:-translate-x-1/2'.split(' ')

export type ConnectedPositionFn = (overlayPosition: OverlayPosition, offsetFromOrigin?: number) => ConnectedPosition[];

export  const  CONNECTED_POSITION_FN = new InjectionToken<ConnectedPositionFn>('ConnectedPositionFn')

export const getConnectedPosition = (overlayPosition: OverlayPosition, offsetFromOrigin = 0): ConnectedPosition[] => {
  switch (overlayPosition) {
    case 'below':
    case 'below.left':
      return [
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: offsetFromOrigin },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: offsetFromOrigin * -1 }
      ];
    case 'below.center':
      return [
        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offsetFromOrigin },
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: offsetFromOrigin * -1 }
      ];
    case 'below.right':
      return [
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: offsetFromOrigin },
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: offsetFromOrigin * -1 }
      ];


    case 'above.left':
      return [
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: offsetFromOrigin * -1 },
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: offsetFromOrigin }
      ];
    case 'above':
    case 'above.center':
      return [
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: offsetFromOrigin * -1, panelClass: popupClasses },
        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offsetFromOrigin, panelClass: popupClasses }

      ];
    case 'above.right':
      return [
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom',offsetY: offsetFromOrigin*-1 },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top',offsetY: offsetFromOrigin }
      ];

    case 'left.top':
      return [
        { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: offsetFromOrigin*-1 },
        { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' ,offsetX: offsetFromOrigin}
      ];
    case 'left':
    case 'left.center':
      return [
        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: offsetFromOrigin*-1 },
        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offsetFromOrigin }
      ];
    case 'left.bottom':
      return [
        { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: offsetFromOrigin*-1 },
        { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: offsetFromOrigin }
      ];


    case 'right.top':
      return [
        { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: offsetFromOrigin },
        { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: offsetFromOrigin*-1 }
      ];
    case 'right':
    case 'right.center':
      return [
        { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offsetFromOrigin },
        { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: offsetFromOrigin*-1 }
      ];
    case 'right.bottom':
      return [
        { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: offsetFromOrigin },
        { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: offsetFromOrigin*-1 }
      ];

    default:
      return [
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top',offsetY: offsetFromOrigin  },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom',offsetY: offsetFromOrigin*-1  }
      ];
  }
};
