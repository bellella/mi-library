import { Theme } from "types";
import { createMi } from "../create-mi";
import { GridProps, GridStyle } from "../mi-styles";
import { Div, DivInterface } from "./Div";

export interface GridInterface extends DivInterface, GridProps { }

const cssSet = (theme: Theme) => ({ ...(theme.set.Grid && theme.set.Grid) })

export const Grid = createMi<GridInterface>({
  tagName: <Div />,
  styles: [GridStyle],
  className: 'mina',
  css: {
    display: 'grid'
  },
  cssSet
});
