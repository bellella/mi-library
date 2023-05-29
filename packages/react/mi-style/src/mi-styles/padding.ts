import { MiStyle, NumberOrString } from "types";
import { applyUnit } from "utils";

export const PaddingStyle: MiStyle = {
  apply: ({ padding, pt, pr, pb, pl }, theme) => ({
    ...(padding && {
      padding: applyUnit(padding, theme)
    }),
    ...(pt && {
      paddingTop: applyUnit(pt, theme)
    }),
    ...(pr && {
      paddingRight: applyUnit(pr, theme)
    }),
    ...(pb && {
      paddingBottom: applyUnit(pb, theme)
    }),
    ...(pl && {
      paddingLeft: applyUnit(pl, theme)
    }),
  }),
  propsNames: ['padding', 'pt', 'pr', 'pb', 'pl'],
}

export interface PaddingProps {
  padding?: NumberOrString;
  pt?: NumberOrString;
  pr?: NumberOrString;
  pb?: NumberOrString;
  pl?: NumberOrString;
}