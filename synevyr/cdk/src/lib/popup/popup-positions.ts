import { ConnectedPosition } from '@angular/cdk/overlay';

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
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: offsetFromOrigin * -1 },
        { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offsetFromOrigin }

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
