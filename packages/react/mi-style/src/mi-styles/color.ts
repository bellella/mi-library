import { MiStyle } from "types";
import { applyColor } from "utils";

export const ColorStyle: MiStyle = {
  apply: ({ background, backgroundColor, color }, theme) => ({
    ...(background && {
      background: applyColor(background, theme)
    }),
    ...(backgroundColor && {
      backgroundColor: applyColor(backgroundColor, theme)
    }),
    ...(color && {
      color: applyColor(color, theme)
    }),
  }),
  propsNames: ['background', 'backgroundColor', 'color']
}

export interface ColorProps {
  background?: string;
  backgroundColor?: string;
  color?: string;
}