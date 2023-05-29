import { MiStyle, NumberOrString } from "types";
import { applyUnit } from "utils";

export const FlexStyle: MiStyle = {
  apply: ({ gap, alignItems, justifyContent, flexFlow, flexWrap }, theme) => ({
    ...(alignItems && { alignItems }),
    ...(justifyContent && { justifyContent }),
    ...(gap && { gap: applyUnit(gap, theme) }),
    ...(flexFlow && { flexFlow }),
    ...(flexWrap && { flexWrap }),
  }),
  propsNames: ['alignItems', 'justifyContent', 'gap', 'flexFlow', 'flexWrap']
}

export const FlexContentStyle: MiStyle = {
  apply: ({ flex, flexGrow, flexShrink, flexBasis }) => ({
    ...(flex !== undefined && { flex }),
    ...(flexGrow !== undefined && { flexGrow }),
    ...(flexShrink !== undefined && { flexShrink }),
    ...(flexBasis !== undefined && { flexBasis }),
  }),
  propsNames: ['flex', 'flexGrow', 'flexShrink', 'flexBasis']
}

export interface FlexProps {
  gap?: NumberOrString;
  alignItems?: string;
  justifyContent?: string;
  flexFlow?: string;
  flexWrap?: string;
}

export interface FlexContentProps {
  flexGrow?: NumberOrString;
  flexShrink?: NumberOrString;
  flexBasis?: NumberOrString;
}