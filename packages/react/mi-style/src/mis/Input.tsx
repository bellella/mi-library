import { Theme } from "types";
import { createMi } from "../create-mi";
import { ColorProps, ColorStyle, FontProps, FontStyle, MarginProps, MarginStyle, PaddingProps, PaddingStyle, PositionProps, PositionStyle, SizeProps, SizeStyle } from "../mi-styles";

export interface InputInterface extends FontProps, PaddingProps, MarginProps, SizeProps, PositionProps, ColorProps { }

const cssSet = (theme: Theme) => ({ ...(theme.set.Input && theme.set.Input) })

export const Input = createMi<InputInterface>({
  tagName: <input type="text" />,
  styles: [PaddingStyle, MarginStyle, SizeStyle, PositionStyle, ColorStyle, FontStyle],
  cssSet,
  className: 'Input',
  css: `
    border: none;
  `
});