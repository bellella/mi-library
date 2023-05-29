import { Media, MiStyle, NumberOrString } from "types";
import { applyUnit, applyMedia } from "utils";

export const FontStyle: MiStyle = {
  apply: ({ fontSize, fontFamily, fontWeight, lineHeight, textAlign, textTransform }, theme) => ({
    ...(fontSize && (!isNaN(fontSize) || typeof fontSize === 'string') && {
      fontSize: applyUnit(fontSize, theme)
    }),
    ...(fontSize && typeof fontSize === 'object' && {
      ...applyMedia(fontSize, theme, (value) => ({
        fontSize: applyUnit(value, theme)
      }))
    }),
    ...(fontFamily && { fontFamily }),
    ...(fontWeight && { fontWeight }),
    ...(lineHeight && { lineHeight }),
    ...(textAlign && { textAlign }),
    ...(textTransform && { textTransform }),
  }),
  propsNames: ['fontSize', 'fontFamily', 'fontWeight', 'lineHeight', 'textAlign', 'textTransform']
}

export interface FontProps {
  fontSize?: NumberOrString | Media<NumberOrString>;
  fontFamily?: string;
  fontWeight?: NumberOrString;
  lineHeight?: NumberOrString;
  textAlign?: string;
  textTransform?: string;
}