import { MiStyle, NumberOrString } from "types";
import { applyUnit } from "utils";

export const SizeStyle: MiStyle = {
  apply: ({ width, height }, theme) => ({
    ...(width && {
      width: applyUnit(width, theme)
    }),
    ...(height && {
      height: applyUnit(height, theme)
    }),
  }),
  propsNames: ['width', 'height']
}

export interface SizeProps {
  width?: NumberOrString;
  height?: NumberOrString;
}