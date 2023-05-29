import { Media, MiStyle, NumberOrString } from "types";
import { applyMedia, applyUnit } from "utils";

export const GridStyle: MiStyle = {
  apply: ({ row, column, alignItems, justifyContent, gap }, theme) => ({
    ...(row && typeof row === 'number' && { gridTemplateRows: Array(row).fill('1fr').join(' ') }),
    ...(row && typeof row === 'string' && { gridTemplateRows: row }),
    ...(row && typeof row === 'object' && {
      ...applyMedia(row, theme, (value) => ({
        gridTemplateRows: isNaN(value) ? value : Array(value).fill('1fr').join(' ')
      }))
    }),
    ...(column && typeof column === 'number' && { gridTemplateColumns: Array(column).fill('1fr').join(' ') }),
    ...(column && typeof column === 'string' && { gridTemplateColumns: column }),
    ...(column && typeof column === 'object' && {
      ...applyMedia(column, theme, (value) => ({
        gridTemplateColumns: isNaN(value) ? value : Array(value).fill('1fr').join(' ')
      }))
    }),
    ...(alignItems && { alignItems }),
    ...(justifyContent && { justifyContent }),
    ...(gap && { gap: applyUnit(gap, theme) }),
  }),
  propsNames: ['row', 'column', 'alignItems', 'justifyContent', 'gap']
}

export interface GridProps {
  row?: NumberOrString | Media<NumberOrString>;
  column?: NumberOrString | Media<NumberOrString>;
  alignItems?: string;
  justifyContent?: string;
  gap?: NumberOrString
}