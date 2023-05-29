import { Theme } from "types";
import { createMi } from "../create-mi";
import { FlexProps, FlexStyle } from "../mi-styles";
import { Div, DivInterface } from "./Div";

export interface FlexInterface extends DivInterface, FlexProps { }

const cssSet = (theme: Theme) => ({ ...(theme.set.Flex && theme.set.Flex) })

export const Flex = createMi<FlexInterface>({
  tagName: <Div />,
  styles: [FlexStyle],
  css: {
    display: 'flex',
  },
  cssSet
});