import { Media, MiStyle } from "types";
import { applyMedia } from "utils";

export const DisplayStyle: MiStyle = {
  apply: ({ display, overflow, opacity }, theme) => ({
    ...(display && typeof display === 'string' && { display }),
    ...(display && typeof display === 'object' && {
      ...applyMedia(display, theme, (value) => ({
        display: value
      }))
    }),
    ...(opacity !== undefined && { opacity }),
    ...(overflow && { overflow }),
  }),
  propsNames: ['display', 'overflow', 'opacity']
}

export interface DisplayProps {
  display?: string | Media<string>;
  overflow?: string;
  opacity?: number;
}