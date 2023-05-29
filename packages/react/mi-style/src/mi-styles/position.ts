import { MiStyle, NumberOrString } from "types";
import { applyUnit } from "utils";

export const PositionStyle: MiStyle = {
  apply: ({ position, top, right, bottom, left, zIndex }, theme) => ({
    ...(position && {
      position
    }),
    ...(top !== undefined && {
      top: applyUnit(top, theme)
    }),
    ...(right !== undefined && {
      right: applyUnit(right, theme)
    }),
    ...(bottom !== undefined && {
      bottom: applyUnit(bottom, theme)
    }),
    ...(left !== undefined && {
      left: applyUnit(left, theme)
    }),
    ...(zIndex && { zIndex }),
  }),
  propsNames: ['position', 'top', 'right', 'bottom', 'left', 'zIndex']
}

export interface PositionProps {
  position?: string;
  top?: NumberOrString;
  right?: NumberOrString;
  bottom?: NumberOrString;
  left?: NumberOrString;
  zIndex?: number;
}