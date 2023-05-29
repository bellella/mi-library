import { MiStyle, NumberOrString } from "types";
import { applyUnit, applyColor } from "utils";

export const BorderStyle: MiStyle = {
  apply: ({ borderRadius, border, borderTop, borderRight, borderBottom, borderLeft, borderColor }, theme) => ({
    ...(borderRadius && { borderRadius: applyUnit(borderRadius, theme) }),
    ...(border && { border }),
    ...(borderTop && { borderTop }),
    ...(borderRight && { borderRight }),
    ...(borderBottom && { borderBottom }),
    ...(borderLeft && { borderLeft }),
    ...(borderColor && { borderColor: applyColor(borderColor, theme) })
  }),
  propsNames: ['borderRadius', 'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderColor']
}

export interface BorderProps {
  borderRadius?: NumberOrString;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderColor?: string;
}