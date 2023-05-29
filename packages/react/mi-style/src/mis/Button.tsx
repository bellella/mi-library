import { Theme } from "types";
import { createMi } from "../create-mi";
import { BorderProps, BorderStyle, ColorProps, ColorStyle, MarginProps, MarginStyle, PaddingProps, PaddingStyle, PositionProps, PositionStyle, SizeProps, SizeStyle } from "../mi-styles";

export interface ButtonInterface extends PaddingProps, MarginProps, SizeProps, PositionProps, ColorProps, BorderProps { }

const cssSet = (theme: Theme) => ({ ...(theme.set.Button && theme.set.Button) })

export const Button = createMi<ButtonInterface>({
  tagName: 'button',
  styles: [PaddingStyle, MarginStyle, SizeStyle, PositionStyle, ColorStyle, BorderStyle],
  cssSet,
  className: 'Btn',
  css: `
    background: unset;
    border: none;
    border-width: unset;
  `
});