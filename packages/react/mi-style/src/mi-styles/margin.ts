import { MiStyle, NumberOrString } from "types";
import { applyUnit } from "utils";

export const MarginStyle: MiStyle = {
  apply: ({ margin, mt, mr, mb, ml }, theme) => ({
    ...(margin && {
      margin: applyUnit(margin, theme)
    }),
    ...(mt && {
      marginTop: applyUnit(mt, theme)
    }),
    ...(mr && {
      marginRight: applyUnit(mr, theme)
    }),
    ...(mb && {
      marginBottom: applyUnit(mb, theme)
    }),
    ...(ml && {
      marginLeft: applyUnit(ml, theme)
    }),
  }),
  propsNames: ['margin', 'mt', 'mr', 'mb', 'ml']
}

export interface MarginProps {
  margin?: NumberOrString;
  mt?: NumberOrString;
  mr?: NumberOrString;
  mb?: NumberOrString;
  ml?: NumberOrString;
}